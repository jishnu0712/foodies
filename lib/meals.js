import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    // throw new Error('failed to fetch meals');
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    meal.instructions = xss(meal.instructions);
    meal.slug = slugify(meal.title, {lower: true});

    // image saving
    const extension = meal.image.name.split('').pop();
    const filename = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${filename}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (err) => {
        if (err) {
            throw new Error('Image file could not be uploaded');
        }
    });

    meal.image = `/images/${filename}`;


    db.prepare(`
        INSERT INTO meals(title, summary, instructions, creator, creator_email, image, slug)
        VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `).run(meal);
}