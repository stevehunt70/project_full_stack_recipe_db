use recipe_db;

INSERT INTO categories (name)
VALUES
('Dessert'),
('Main Course'),
('Breakfast'),
('Appetizer'),
('Side Dish');


INSERT INTO recipes (title, description, cooking_time_minutes, servings, category_id)
VALUES (
    'Chocolate Cake',
    'A rich and moist chocolate cake perfect for any occasion.',
    45,
    8,
    1  -- 'Dessert' category
),
(
    'Spaghetti Bolognese',
    'A classic Italian pasta dish with rich meat sauce.',
    60,
    4,
    2
),
(
    'Vegetable Stir-Fry',
    'Quick and healthy stir-fried vegetables.',
    20,
    2,
    2
),
(
    'Pancakes',
    'Fluffy breakfast pancakes served with syrup.',
    15,
    4,
    3
),
(
    'Caesar Salad',
    'Classic Caesar with romaine,croutons, and creamy dressing.',
    10,
    2,
    4
),
(
    'Guacamole',
    'Fresh and creamy avocado dip.',
    10,
    4,
    5
);


INSERT INTO ingredients (name) VALUES
    ('All-purpose flour'),
    ('Granulated sugar'),
    ('Cocoa powder'),
    ('Baking powder'),
    ('Salt'),
    ('Eggs'),
    ('Milk'),
    ('Vegetable oil'),
    ('Vanilla extract'),
    ('Boiling water'),
    ('Spaghetti'),             -- 11
    ('Ground beef'),           -- 12
    ('Onion'),                 -- 13
    ('Garlic'),                -- 14
    ('Tomato paste'),          -- 15
    ('Crushed tomatoes'),      -- 16
    ('Olive oil'),             -- 17
    ('Black pepper'),          -- 18
    ('Broccoli florets'),  -- 19
    ('Carrot'),            -- 20
    ('Bell pepper'),       -- 21
    ('Soy sauce'),         -- 22
    ('Cornstarch'),        -- 23
    ('Ginger'),            -- 24
    ('Sesame oil'),        -- 25
    ('Baking soda'),      -- 26
    ('Butter'),           -- 27
    ('Maple syrup'),      -- 28
    ('Romaine lettuce'),     -- 29
    ('Croutons'),            -- 30
    ('Parmesan cheese'),     -- 31
    ('Caesar dressing'),     -- 32
    ('Avocado'),           -- 33
    ('Lime juice'),        -- 34
    ('Red onion'),         -- 35
    ('Cilantro'),          -- 36
    ('Tomato');            -- 37


-- Assuming recipe_id = 1 and the ingredient IDs are in order (1 to 10)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, unit) VALUES
    (1, 1, '1 and 3/4', 'cups'),
    (1, 2, '2', 'cups'),
    (1, 3, '3/4', 'cup'),
    (1, 4, '2', 'teaspoons'),
    (1, 5, '1', 'teaspoon'),
    (1, 6, '2', 'large'),
    (1, 7, '1', 'cup'),
    (1, 8, '1/2', 'cup'),
    (1, 9, '2', 'teaspoons'),
    (1, 10, '1', 'cup'),
    (2, 11, '400', 'g'),
    (2, 12, '500', 'g'),
    (2, 13, '1', 'medium, diced'),
    (2, 14, '2', 'cloves, minced'),
    (2, 15, '2', 'tablespoons'),
    (2, 16, '1', 'can'),
    (2, 17, '2', 'tablespoons'),
    (2, 5, '1', 'teaspoon'),
    (2, 18, '1/2', 'teaspoon'),
    (3, 19, '1', 'cup'),
    (3, 20, '1', 'medium, sliced'),
    (3, 21, '1', 'medium, sliced'),
    (3, 22, '3', 'tablespoons'),
    (3, 23, '1', 'teaspoon'),
    (3, 24, '1', 'teaspoon, grated'),
    (3, 25, '1', 'tablespoon'),
    -- Reuse flour (1), milk (7), eggs (6), sugar (2)(4, 1, '1 and 1/2', 'cups'),
    (4, 2, '2', 'tablespoons'),
    (4, 26, '1', 'teaspoon'),
    (4, 6, '1', 'large'),
    (4, 7, '1 and 1/4', 'cups'),
    (4, 27, '2', 'tablespoons, melted'),
    (4, 28, 'as desired', NULL),
    (5, 29, '1', 'head, chopped'),
    (5, 30, '1', 'cup'),
    (5, 31, '1/4', 'cup, grated'),
    (5, 32, '1/3', 'cup'),
    (6, 33, '2', 'ripe, mashed'),
    (6, 34, '1', 'tablespoon'),
    (6, 35, '2', 'tablespoons, finely chopped'),
    (6, 36, '1', 'tablespoon, chopped'),
    (6, 37, '1', 'small, diced'),
    (6, 5, '1/2', 'teaspoon');


INSERT INTO instructions (recipe_id, step_number, instruction) VALUES
    (1, 1, 'Preheat oven to 350°F (175°C). Grease and flour two 9-inch round baking pans.'),
    (1, 2, 'In a large bowl, combine flour, sugar, cocoa powder, baking powder, and salt.'),
    (1, 3, 'Add eggs, milk, oil, and vanilla. Beat on medium speed for 2 minutes.'),
    (1, 4, 'Stir in boiling water (batter will be thin).'),
    (1, 5, 'Pour batter into prepared pans.'),
    (1, 6, 'Bake for 30 to 35 minutes or until a toothpick comes out clean.'),
    (1, 7, 'Cool for 10 minutes; remove from pans to wire racks to cool completely.'),
    (2, 1, 'Heat olive oil in a pan and sauté onion and garlic.'),
    (2, 2, 'Add ground beef and cook until browned.'),
    (2, 3, 'Stir in tomato paste and crushed tomatoes.'),
    (2, 4, 'Season with salt and pepper and simmer for 30 minutes.'),
    (2, 5, 'Cook spaghetti according to package instructions.'),
    (2, 6, 'Serve sauce over spaghetti.'),
    (3, 1, 'Heat sesame oil in a wok.'),
    (3, 2, 'Add ginger and sauté briefly.'),
    (3, 3, 'Add vegetables and stir-fry for 5–7 minutes.'),
    (3, 4, 'Mix soy sauce and cornstarch with a little water and pour into the wok.'),
    (3, 5, 'Stir until sauce thickens. Serve hot.'),
    (4, 1, 'Mix flour, sugar, and baking soda in a bowl.'),
    (4, 2, 'In another bowl, whisk egg, milk, and melted butter.'),
    (4, 3, 'Combine wet and dry ingredients until smooth.'),
    (4, 4, 'Pour batter onto hot griddle and cook until bubbles form. Flip and cook other side.'),
    (4, 5, 'Serve with maple syrup.'),
    (5, 1, 'In a large bowl, combine lettuce, croutons, and cheese.'),
    (5, 2, 'Add dressing and toss to coat evenly.'),
    (5, 3, 'Serve immediately.'),
    (6, 1, 'Mash avocados in a bowl.'),
    (6, 2, 'Add lime juice, onion, cilantro, tomato, and salt.'),
    (6, 3, 'Mix well and serve fresh.');  
