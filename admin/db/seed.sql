-- Seed file: inserts all hard-coded stories into the database.
-- Uses ON CONFLICT DO NOTHING so re-runs are safe.

DO $$
DECLARE act_id INTEGER;
BEGIN

  -- ── Edmond Albius ────────────────────────────────────────────────────────
  INSERT INTO activities (slug, title, subtitle, image_path, category, link, description, history, partner, partner_name, is_current_event, type)
  VALUES (
    'albius',
    'Edmond Albius',
    'Le jeune homme qui a révolutionné la culture de la vanille',
    'http://localhost:3001/uploads/Edmond_Albius.png',
    'Personnalités',
    'https://example.com/jardin-vanille',
    'L''histoire d''un jeune esclave réunionnais qui a découvert le secret de la pollinisation de la vanille.',
    'Edmond Albius est né esclave en 1829 à Sainte-Suzanne, à La Réunion. Orphelin très jeune, il grandit dans la propriété de Ferréol Bellier-Beaumont, un botaniste passionné. C''est auprès de lui qu''Edmond développe son intérêt pour les plantes. À l''âge de 12 ans, en observant les fleurs de vanille, il comprend comment les féconder manuellement. Cette technique, encore utilisée aujourd''hui, a permis à La Réunion de devenir un leader mondial de la production de vanille au XIXe siècle. Malheureusement, Edmond Albius n''a jamais été récompensé de son vivant pour cette découverte majeure. Il meurt en 1880, oublié et dans la misère. Ce n''est qu''au début du XXe siècle que son nom a été redécouvert et honoré.',
    FALSE,
    'Jardin des Parfums et des Épices',
    FALSE,
    'cultural'
  ) ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO act_id FROM activities WHERE slug = 'albius';
  IF NOT EXISTS (SELECT 1 FROM learn_more WHERE activity_id = act_id) THEN
    INSERT INTO learn_more (activity_id, content, position) VALUES
      (act_id, 'En 1841, Edmond Albius, un jeune esclave de 12 ans né à Sainte-Suzanne, réalise une découverte qui changera l''histoire de La Réunion et du monde : la pollinisation manuelle de la vanille.', 1),
      (act_id, 'Jusqu''alors, la vanille ne pouvait être cultivée qu''au Mexique, son pays d''origine, grâce à une abeille locale. Edmond Albius découvre une technique simple qui permet de polliniser la fleur à la main.', 2),
      (act_id, 'Cette découverte transforme La Réunion en l''un des premiers producteurs mondiaux de vanille. Aujourd''hui encore, la méthode d''Edmond Albius est utilisée dans le monde entier.', 3),
      (act_id, 'Malgré son génie, Edmond Albius meurt dans la pauvreté en 1880. Il faudra attendre le XXe siècle pour que son nom soit reconnu et célébré comme il se doit.', 4);
  END IF;

  -- ── Mafate ───────────────────────────────────────────────────────────────
  INSERT INTO activities (slug, title, subtitle, image_path, category, link, description, history, partner, partner_name, is_current_event, type)
  VALUES (
    'mafate',
    'Mafate',
    'Le cirque sauvage et préservé de La Réunion',
    'http://localhost:3001/uploads/Mafate.png',
    'Lieux naturels',
    'https://example.com/mafate-guides',
    'Un cirque naturel accessible uniquement à pied, refuge historique des esclaves marrons.',
    'Le cirque de Mafate est un véritable sanctuaire de nature sauvage. Formé par l''érosion et l''effondrement du massif du Piton des Neiges, il couvre environ 95 km². Son isolement géographique en fait un lieu unique : aucune route carrossable ne permet d''y accéder. Les habitants de Mafate vivent en harmonie avec la nature, et le ravitaillement se fait par hélicoptère ou à dos d''homme. Le cirque a joué un rôle crucial dans l''histoire de l''île en servant de refuge aux esclaves en fuite, les marrons, qui y trouvaient liberté et sécurité. Aujourd''hui, Mafate attire les amoureux de randonnée et de nature préservée, offrant des sentiers spectaculaires et des paysages à couper le souffle.',
    FALSE,
    'Guides de montagne Mafate',
    FALSE,
    'cultural'
  ) ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO act_id FROM activities WHERE slug = 'mafate';
  IF NOT EXISTS (SELECT 1 FROM learn_more WHERE activity_id = act_id) THEN
    INSERT INTO learn_more (activity_id, content, position) VALUES
      (act_id, 'Mafate est l''un des trois cirques naturels de La Réunion, formé par l''effondrement du volcan du Piton des Neiges il y a des milliers d''années.', 1),
      (act_id, 'Son nom viendrait d''un esclave marron qui s''y serait réfugié au XVIIIe siècle. Le cirque a longtemps été un lieu de liberté pour ceux qui fuyaient l''esclavage.', 2),
      (act_id, 'Aujourd''hui, Mafate est le seul cirque de l''île accessible uniquement à pied ou en hélicoptère. Aucune route ne le traverse, préservant son authenticité.', 3),
      (act_id, 'Classé au patrimoine mondial de l''UNESCO, Mafate abrite plusieurs petits villages et offre des paysages spectaculaires aux randonneurs du monde entier.', 4);
  END IF;

  -- ── Madame Desbassyns ─────────────────────────────────────────────────────
  INSERT INTO activities (slug, title, subtitle, image_path, category, link, description, history, partner, partner_name, is_current_event, type)
  VALUES (
    'desbassyns',
    'Madame Desbassyns',
    'Figure controversée de l''histoire réunionnaise',
    'http://localhost:3001/uploads/Madame_Desbassyns.png',
    'Personnalités',
    'https://example.com/musee-villele',
    'Une grande propriétaire terrienne du XIXe siècle, symbole du système esclavagiste.',
    'Françoise Châtelain, devenue Madame Desbassyns par son mariage, est une figure incontournable et controversée de l''histoire de La Réunion. Née en 1755, elle hérite et développe un empire foncier considérable, notamment grâce à la culture du café et de la canne à sucre. Elle possédait des centaines d''esclaves et était réputée pour sa grande richesse. Sa mémoire reste marquée par les légendes qui la décrivent comme une maîtresse impitoyable. Le domaine de Villèle, qu''elle a habité, est aujourd''hui un musée historique qui permet de découvrir la vie des grands propriétaires terriens de l''époque coloniale, tout en questionnant le système esclavagiste qui a façonné l''île.',
    TRUE,
    'Musée de Villèle',
    FALSE,
    'cultural'
  ) ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO act_id FROM activities WHERE slug = 'desbassyns';
  IF NOT EXISTS (SELECT 1 FROM learn_more WHERE activity_id = act_id) THEN
    INSERT INTO learn_more (activity_id, content, position) VALUES
      (act_id, 'Madame Desbassyns (1755-1846) fut l''une des femmes les plus riches et puissantes de La Réunion au XIXe siècle, propriétaire de vastes domaines et de centaines d''esclaves.', 1),
      (act_id, 'Son nom est associé à la fois à la prospérité économique de l''île et aux aspects les plus sombres de l''esclavage. Les légendes locales lui prêtent des pratiques cruelles.', 2),
      (act_id, 'Le domaine de Villèle, sa résidence principale, est aujourd''hui un musée qui témoigne de cette époque complexe de l''histoire réunionnaise.', 3),
      (act_id, 'Son histoire invite à réfléchir sur le passé colonial de l''île et sur la mémoire de l''esclavage, des sujets encore sensibles aujourd''hui.', 4);
  END IF;

  -- ── Le Piton de la Fournaise ──────────────────────────────────────────────
  INSERT INTO activities (slug, title, subtitle, image_path, category, link, description, history, partner, partner_name, is_current_event, type)
  VALUES (
    'volcan',
    'Le Piton de la Fournaise',
    'L''un des volcans les plus actifs au monde',
    'http://localhost:3001/uploads/Le_Piton_de_la_Fournaise.png',
    'Nature',
    'https://example.com/cite-volcan',
    'Un géant de feu qui fascine et émerveille depuis des millénaires.',
    'Le Piton de la Fournaise est un trésor géologique qui attire scientifiques et touristes du monde entier. Situé dans le sud-est de l''île, ce volcan effusif entre en éruption régulièrement, offrant un spectacle naturel grandiose. Contrairement aux volcans explosifs, ses éruptions sont relativement prévisibles et spectaculaires, permettant d''observer la lave en fusion en toute sécurité. Le volcan est surveillé en permanence par l''Observatoire Volcanologique du Piton de la Fournaise. Ses coulées de lave ont façonné les paysages lunaires de l''Enclos Fouqué et continuent d''agrandir l''île lorsqu''elles atteignent l''océan. Le Piton de la Fournaise est un symbole vivant de la puissance de la nature.',
    TRUE,
    'Cité du Volcan',
    TRUE,
    'cultural'
  ) ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO act_id FROM activities WHERE slug = 'volcan';
  IF NOT EXISTS (SELECT 1 FROM learn_more WHERE activity_id = act_id) THEN
    INSERT INTO learn_more (activity_id, content, position) VALUES
      (act_id, 'Le Piton de la Fournaise est l''un des volcans les plus actifs de la planète, avec une éruption presque chaque année. Il culmine à 2 632 mètres d''altitude.', 1),
      (act_id, 'Formé il y a environ 530 000 ans, ce volcan bouclier continue de façonner le paysage de La Réunion. Ses coulées de lave peuvent atteindre l''océan, créant de nouvelles terres.', 2),
      (act_id, 'Les éruptions du Piton de la Fournaise sont généralement peu dangereuses car le volcan se trouve dans une zone inhabitée. Elles attirent des milliers de visiteurs chaque année.', 3),
      (act_id, 'La Cité du Volcan est un musée moderne et interactif qui permet de comprendre l''activité volcanique et l''histoire géologique fascinante de l''île.', 4);
  END IF;

  -- ── Le Grand Raid ─────────────────────────────────────────────────────────
  INSERT INTO activities (slug, title, subtitle, image_path, category, link, description, history, partner, partner_name, is_current_event, type)
  VALUES (
    'grand-raid',
    'Le Grand Raid',
    'La diagonale des fous, course mythique de l''ultra-trail',
    'http://localhost:3001/uploads/Le_Grand_Raid.png',
    'Sport & Culture',
    'https://example.com/grand-raid',
    'Une course extrême à travers les paysages les plus spectaculaires de l''île.',
    'Le Grand Raid est bien plus qu''une simple course : c''est une aventure humaine et sportive hors du commun. Lancée par des passionnés de trail, cette épreuve mythique attire chaque année des milliers de spectateurs et de participants. Le parcours principal, la Diagonale des Fous, relie Saint-Pierre à Saint-Denis en passant par les reliefs les plus difficiles de l''île. Les coureurs affrontent la chaleur, le froid, la fatigue extrême et les terrains techniques. L''événement propose également d''autres courses plus accessibles, permettant à chacun de découvrir l''île autrement. Le Grand Raid incarne l''esprit réunionnais : courage, solidarité et amour de la nature.',
    FALSE,
    'Grand Raid Réunion',
    TRUE,
    'cultural'
  ) ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO act_id FROM activities WHERE slug = 'grand-raid';
  IF NOT EXISTS (SELECT 1 FROM learn_more WHERE activity_id = act_id) THEN
    INSERT INTO learn_more (activity_id, content, position) VALUES
      (act_id, 'Créé en 1989, le Grand Raid de La Réunion est l''une des courses d''ultra-trail les plus difficiles et prestigieuses au monde, surnommée ''La Diagonale des Fous''.', 1),
      (act_id, 'Les coureurs parcourent plus de 160 km et franchissent plus de 9 000 mètres de dénivelé positif, traversant les trois cirques, des forêts tropicales et des paysages volcaniques.', 2),
      (act_id, 'Chaque année en octobre, près de 3 000 coureurs venus du monde entier se lancent dans ce défi extrême qui peut durer jusqu''à 66 heures.', 3),
      (act_id, 'Le Grand Raid est devenu un événement majeur de l''île, célébrant l''esprit de dépassement de soi et la beauté sauvage de La Réunion.', 4);
  END IF;

  -- ── La Cité du Volcan ─────────────────────────────────────────────────────
  INSERT INTO activities (slug, title, subtitle, image_path, category, link, description, history, partner, partner_name, is_current_event, type)
  VALUES (
    'cite-du-volcan',
    'La Cité du Volcan',
    'Un voyage au cœur de la Terre',
    'http://localhost:3001/uploads/La_Cite_du_Volcan.png',
    'Patrimoine culturel',
    'https://example.com/cite-volcan',
    'Un musée interactif dédié au volcanisme et à l''histoire géologique de La Réunion.',
    'La Cité du Volcan est bien plus qu''un musée : c''est une expérience immersive qui transporte ses visiteurs dans les entrailles de la Terre. Inaugurée en 2014, elle remplace l''ancienne Maison du Volcan et offre des technologies de pointe pour raconter l''histoire géologique de La Réunion. Les visiteurs peuvent explorer la formation de l''île il y a des millions d''années, observer des échantillons de roche volcanique, et comprendre les mécanismes qui régissent les éruptions. Le musée met également en lumière le travail des vulcanologues et des scientifiques qui surveillent le Piton de la Fournaise 24h/24. Une visite à la Cité du Volcan est un passage obligé pour tous les curieux de nature et de science.',
    TRUE,
    'Cité du Volcan',
    FALSE,
    'cultural'
  ) ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO act_id FROM activities WHERE slug = 'cite-du-volcan';
  IF NOT EXISTS (SELECT 1 FROM learn_more WHERE activity_id = act_id) THEN
    INSERT INTO learn_more (activity_id, content, position) VALUES
      (act_id, 'La Cité du Volcan, située à Sainte-Rose, est un musée moderne et immersif qui explore le volcanisme sous toutes ses formes.', 1),
      (act_id, 'À travers des expositions interactives, des projections 4D et des reconstitutions, les visiteurs découvrent la naissance de l''île, ses éruptions historiques et la vie du Piton de la Fournaise.', 2),
      (act_id, 'Le musée propose également un tunnel de lave reconstitué et des expériences sensorielles qui plongent le public au cœur de l''activité volcanique.', 3),
      (act_id, 'C''est une étape incontournable pour comprendre pourquoi La Réunion est un laboratoire naturel exceptionnel pour la volcanologie mondiale.', 4);
  END IF;

  -- ── Le Musée de Villèle ───────────────────────────────────────────────────
  INSERT INTO activities (slug, title, subtitle, image_path, category, link, description, history, partner, partner_name, is_current_event, type)
  VALUES (
    'musee-de-villele',
    'Le Musée de Villèle',
    'Plongée dans l''histoire coloniale et créole',
    'http://localhost:3001/uploads/Le_Musee_de_Villele.png',
    'Patrimoine culturel',
    'https://example.com/musee-villèle',
    'Ancienne demeure de Madame Desbassyns, témoin de l''époque des grandes plantations.',
    'Le Musée de Villèle est un lieu de mémoire essentiel pour comprendre l''histoire de La Réunion. Ancienne propriété de la famille Desbassyns, ce domaine incarne l''opulence des grands propriétaires terriens de l''époque coloniale, mais aussi les injustices du système esclavagiste. Le musée propose des parcours pédagogiques qui abordent sans détour les réalités de cette période : le travail forcé, la vie quotidienne des esclaves, l''engagisme après l''abolition de 1848. Les collections comprennent des objets d''époque, des documents historiques et des reconstitutions fidèles. La visite du domaine permet de prendre conscience de la richesse et de la complexité de l''histoire réunionnaise, entre splendeur architecturale et mémoire douloureuse.',
    TRUE,
    'Musée de Villèle',
    FALSE,
    'cultural'
  ) ON CONFLICT (slug) DO NOTHING;

  SELECT id INTO act_id FROM activities WHERE slug = 'musee-de-villele';
  IF NOT EXISTS (SELECT 1 FROM learn_more WHERE activity_id = act_id) THEN
    INSERT INTO learn_more (activity_id, content, position) VALUES
      (act_id, 'Le domaine de Villèle, situé à Saint-Gilles-les-Hauts, fut l''une des plus grandes propriétés agricoles de l''île au XIXe siècle.', 1),
      (act_id, 'Aujourd''hui transformé en musée, il retrace la vie des colons, des engagés et des esclaves qui ont vécu et travaillé sur ces terres.', 2),
      (act_id, 'Les visiteurs peuvent découvrir la chapelle pointue, les bâtiments d''habitation, et les expositions qui racontent l''histoire sociale et culturelle de La Réunion.', 3),
      (act_id, 'Le musée offre un regard lucide sur le passé colonial de l''île, invitant à la réflexion et à la transmission de la mémoire collective.', 4);
  END IF;

END $$;
