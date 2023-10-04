
--  -- Create a table for books
--  CREATE TABLE books (
--      id SERIAL PRIMARY KEY,
--      title VARCHAR(255)
--      image
--  );

--  -- Create a table for trivia
--  CREATE TABLE trivia (
--      id SERIAL PRIMARY KEY,
--      book_id INT,
--      percentage INT,
--      content TEXT,
--      FOREIGN KEY (book_id) REFERENCES books(id)
-- );
use mischief_managed_db;
-- Insert data for the book titles
INSERT INTO book (title, image)
VALUES
    ('Harry Potter and the Sorcerer’s Stone', "/assets/covers/sorcerers_stone.png"),
    ('Harry Potter and the Chamber of Secrets', "/assets/covers/chamber_of_secrets.png"),
    ('Harry Potter and the Prisoner of Azkaban', "/assets/covers/prisoner_of_azkaban.png"),
    ('Harry Potter and the Goblet of Fire', "/assets/covers/goblet_of_fire.png"),
    ('Harry Potter and the Order of the Phoenix', "/assets/covers/order_of_the_phoenix.png"),
    ('Harry Potter and the Half-Blood Prince', "/assets/covers/half_blood_prince.png"),
    ('Harry Potter and the Deathly Hallows', "/assets/covers/half_blood_prince.png");

-- Insert data for trivia
-- For each book, insert multiple rows corresponding to different percentages
INSERT INTO trivia (book_id, trivia, content)
VALUES
    (1, 25, 'The book was originally released in 1997 under the title, Harry Potter and the Philosopher’s Stone.'),
    (1, 50, 'J.K. Rowling began writing the first novel of the series in 1990.'),
    (1, 75, 'Harry Potter doesn’t cast a single spell in the movie, Harry Potter and the Sorcerer’s Stone.'),
    (1, 100, 'J.K. Rowling and Harry Potter share the same birthday.'),
    (2, 25, 'In the film, when Hagrid is escorting Harry out of Knockturn Alley, hardcover editions of Harry Potter books can be seen on the shelves.'),
    (2, 50, 'Ron Weasley fears spiders, because when he was a child, his brothers cast a spell on his teddy bear, turning it into a spider.'),
    (2, 75, 'Daniel Radcliffe was initially only offered £125,000 for this film. The actors’ union, Equity, stepped in and negotiated new terms which increased his salary to roughly £2,000,000.'),
    (2, 100, 'Foreign language translations had to change Tom Marvolo Riddle’s name so that an appropriate anagram could be formed: In French, his name is “Tom Elvis Jedusor”, which becomes “Je suis Voldemort.”'),
    (3, 25, 'The Dementors are based on J.K. Rowling''s own depiction and battle with depression.'),
    (3, 50, 'The spell, "Lumos", is also the name of J.K. Rowling''s charity for children.'),
    (3, 75, 'In the film, coffee was used on the Marauder’s Map to give the parchment an aged appearance.'),
    (3, 100, 'J.K. Rowling said that Prisoner of Azkaban was, "the best writing experience I ever had...I was in a very comfortable place writing (number) three. Immediate financial worries were over, and press attention wasn''t yet by any means excessive."'),
    (4, 25, 'Harry Potter and the Goblet of Fire was the first book to be released at the same time in the United States and the United Kingdom.'),
    (4, 50, 'Alan Rickman banned Matthew Lewis (Neville Longbottom) and Rupert Grint (Ron Weasley) from being within 5 meters of his new BMW, because during the making of Harry Potter and the Goblet of Fire, they spilled a milkshake in his car.'),
    (4, 75, 'Matthew Lewis (Neville Longbottom) wore a fat suit for the film.'),
    (4, 100, 'Harry Potter and the Goblet of Fire won the Hugo Award (premier award in science fiction) in 2001, the only Harry Potter novel to do so.'),
    (5, 25, 'Evanna Lynch beat 15,000 girls for the role of Luna Lovegood, she was 9th in line of 29 finalists, and when viewing the audition videos, one of the producers, David Barron, stopped viewing after Evanna''s audition and said, "She is Luna.”.'),
    (5, 50, 'Even though Harry Potter and the Order of the Phoenix is the longest book in the series, it is the 2nd shortest movie in the Harry Potter film Series.'),
    (5, 75, 'If every copy of all the Harry Potter books were placed end to end, they would circle the Earth’s equator over 16 times.'),
    (5, 100, 'J.K. Rowling was a schoolteacher before writing the Potter books.'),
    (6, 25, 'Harry Potter and the Half Blood Prince was the only film of the series to be nominated for the Best Cinematography Academy Award.'),
    (6, 50, 'Mary GrandPre created the cover and chapter illustrations for the Harry Potter United States editions published by Scholastic.'),
    (6, 75, 'All spells in the Harry Potter series are derived from Latin.'),
    (6, 100, 'Plant names like Mugwort and Toadflax sound like words pulled from Rowling''s boundless imagination, but these florae actually exist in real life.'),
    (7, 25, 'Harry Potter and the Deathly Hollows sold 8.3 million copies in the first 24 hours of its release.'),
    (7, 50, 'The title of the book refers to three mythical objects featured in the story, collectively known as the Deathly Hallows. An unbeatable wand (the Elder Wand), a stone to bring the dead to life (the Resurrection Stone), and a cloak of invisibility.'),
    (7, 75, 'Two minutes into the first film, Hermione’s parents talk about Australia. This is a reference to the book where Hermione claims to have wiped herself from her parents’ memories and gave them new identities involving a move to Australia, something they’ve always wanted to do.'),
    (7, 100, 'By the end of the franchise, the lightning scar had been applied approximately fifty-eight hundred times to Radcliffe, stunt doubles, and stand-ins.');
