export interface Story {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  isCurrentEvent: boolean;
  isSponsored: boolean;
  partnerName?: string;
  partnerUrl?: string;
  shortDescription: string;
  storySlides: string[];
  fullText: string;
}

export const stories: Story[] = [
  {
    slug: 'albius',
    title: 'Edmond Albius',
    subtitle: 'Le jeune esclave qui révolutionna la culture de la vanille',
    image: 'https://images.pexels.com/photos/4022090/pexels-photo-4022090.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Personnalités',
    isCurrentEvent: false,
    isSponsored: false,
    partnerName: 'Jardin des Épices',
    partnerUrl: 'https://example.com/jardin-epices',
    shortDescription: 'Découvrez l\'histoire extraordinaire d\'Edmond Albius, qui à 12 ans inventa la pollinisation manuelle de la vanille.',
    storySlides: [
      'En 1841, à l\'âge de 12 ans, Edmond Albius, jeune esclave à La Réunion, découvre la technique de pollinisation manuelle de la vanille. Cette découverte va révolutionner la culture de cette épice précieuse.',
      'Jusqu\'alors, la vanille ne pouvait être cultivée qu\'au Mexique, son lieu d\'origine, où des insectes spécifiques assuraient sa pollinisation. La technique d\'Edmond permit à La Réunion de devenir un producteur majeur.',
      'Malgré son génie, Edmond Albius ne reçut aucune reconnaissance de son vivant et mourut dans la pauvreté en 1880. Aujourd\'hui, son nom est célébré à La Réunion et dans le monde entier.'
    ],
    fullText: 'Edmond Albius est né esclave à Sainte-Suzanne en 1829. Orphelin très jeune, il fut confié à Ferréol Beaumont-Bellier, un botaniste passionné. C\'est dans ce contexte qu\'Edmond développa son intérêt pour les plantes. Sa découverte de la pollinisation manuelle de la vanille, effectuée avec une simple tige de bambou, permit à La Réunion de développer une industrie vanillière florissante. Cette technique, toujours utilisée aujourd\'hui, nécessite un geste précis et délicat pour féconder chaque fleur. Malgré l\'importance de sa contribution, Edmond ne fut jamais récompensé et vécut dans l\'oubli jusqu\'à sa mort. Ce n\'est que bien plus tard que son génie fut reconnu et célébré comme il se devait.'
  },
  {
    slug: 'mafate',
    title: 'Le Cirque de Mafate',
    subtitle: 'Un territoire sauvage et préservé au cœur de La Réunion',
    image: 'https://images.pexels.com/photos/417054/pexels-photo-417054.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Lieux',
    isCurrentEvent: false,
    isSponsored: true,
    partnerName: 'Mafate Aventure',
    partnerUrl: 'https://example.com/mafate-aventure',
    shortDescription: 'Explorez le seul cirque de l\'île accessible uniquement à pied, refuge des esclaves marrons au XIXe siècle.',
    storySlides: [
      'Le cirque de Mafate est une caldeira volcanique de 95 km² située au cœur de La Réunion. Son nom vient du mot malgache "mahafaty" signifiant "qui tue", en référence à son relief escarpé et dangereux.',
      'Au XIXe siècle, Mafate devint un refuge pour les esclaves marrons fuyant les plantations. Ces hommes et femmes courageux trouvèrent dans ces montagnes inaccessibles un sanctuaire de liberté.',
      'Aujourd\'hui, Mafate reste le seul cirque de l\'île sans route carrossable. Ses habitants vivent en harmonie avec la nature, et le cirque est classé au patrimoine mondial de l\'UNESCO depuis 2010.'
    ],
    fullText: 'Le cirque de Mafate est l\'un des trois cirques naturels de La Réunion, avec Cilaos et Salazie. Formé par l\'effondrement du sommet d\'un ancien volcan, il offre des paysages spectaculaires de pics, de ravines et de plateaux verdoyants. Accessible uniquement à pied ou en hélicoptère, Mafate abrite une dizaine d\'îlets habités où vivent environ 700 personnes. Ces communautés vivent de l\'agriculture, de l\'élevage et du tourisme, maintenant un mode de vie traditionnel unique. Les randonneurs du monde entier viennent explorer ses sentiers, admirer ses panoramas à couper le souffle et partager un moment avec ses habitants accueillants. Mafate incarne l\'esprit d\'aventure et de liberté qui caractérise La Réunion.'
  },
  {
    slug: 'desbassyns',
    title: 'Madame Desbassyns',
    subtitle: 'La riche propriétaire terrienne et son héritage controversé',
    image: 'https://images.pexels.com/photos/276092/pexels-photo-276092.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Personnalités',
    isCurrentEvent: false,
    isSponsored: true,
    partnerName: 'Musée Historique de Villèle',
    partnerUrl: 'https://example.com/musee-villele',
    shortDescription: 'Figure emblématique et controversée de l\'histoire réunionnaise, propriétaire de la plus grande plantation de l\'île.',
    storySlides: [
      'Françoise Châtelain, devenue Madame Desbassyns par mariage, était l\'une des femmes les plus riches et puissantes de La Réunion au début du XIXe siècle. Elle possédait d\'immenses domaines et des centaines d\'esclaves.',
      'Son domaine de Villèle, situé dans l\'ouest de l\'île, était l\'un des plus prospères. Elle y cultivait le café et la canne à sucre, bâtissant une fortune considérable sur le travail forcé.',
      'Après sa mort en 1846, sa légende grandit, mêlant faits historiques et récits fantastiques. Aujourd\'hui, son ancienne demeure est un musée qui raconte l\'histoire de l\'esclavage et de la société coloniale à La Réunion.'
    ],
    fullText: 'Madame Desbassyns reste une figure complexe de l\'histoire réunionnaise. D\'un côté, elle fut une femme d\'affaires redoutable qui géra avec succès un empire commercial dans une époque dominée par les hommes. De l\'autre, elle incarne le système esclavagiste dans toute sa brutalité. Les récits populaires l\'ont transformée en figure presque mythique, certains la décrivant comme une sorcière cruelle. Le musée de Villèle, installé dans son ancienne chapelle et dépendances, permet aujourd\'hui de comprendre cette période sombre de l\'histoire tout en honorant la mémoire des esclaves qui ont souffert dans ces lieux. C\'est un témoignage essentiel pour ne jamais oublier.'
  },
  {
    slug: 'volcan',
    title: 'Le Piton de la Fournaise',
    subtitle: 'L\'un des volcans les plus actifs au monde',
    image: 'https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Nature',
    isCurrentEvent: true,
    isSponsored: false,
    partnerName: 'Observatoire Volcanologique',
    partnerUrl: 'https://example.com/observatoire',
    shortDescription: 'Vivez l\'expérience fascinante d\'un volcan en activité quasi permanente, façonnant sans cesse le paysage réunionnais.',
    storySlides: [
      'Le Piton de la Fournaise culmine à 2 632 mètres d\'altitude et entre en éruption en moyenne deux fois par an. C\'est l\'un des volcans les plus actifs de la planète et l\'un des plus surveillés.',
      'Chaque éruption attire des milliers de spectateurs venus admirer les fontaines de lave incandescente. Ces coulées façonnent le paysage, créant de nouvelles terres qui s\'ajoutent à l\'île.',
      'Les éruptions récentes ont permis aux scientifiques de mieux comprendre les mécanismes volcaniques. L\'observatoire surveille en permanence l\'activité du volcan pour protéger les populations.'
    ],
    fullText: 'Le Piton de la Fournaise est né il y a environ 500 000 ans. Situé dans le sud-est de l\'île, il occupe près d\'un tiers de la surface de La Réunion. Contrairement à son voisin le Piton des Neiges (aujourd\'hui éteint), la Fournaise est toujours très active. Ses éruptions, généralement effusives, produisent des coulées de lave fluide qui descendent vers l\'océan. Le Grand Brûlé, vaste plaine de lave solidifiée, témoigne de siècles d\'activité volcanique. Les visiteurs peuvent randonner jusqu\'au cratère Dolomieu et observer les paysages lunaires de l\'enclos Fouqué. Chaque éruption est un spectacle naturel grandiose qui rappelle la puissance de la Terre et le caractère vivant de notre île.'
  },
  {
    slug: 'grand-raid',
    title: 'Le Grand Raid',
    subtitle: 'La course la plus extrême de l\'océan Indien',
    image: 'https://images.pexels.com/photos/2402786/pexels-photo-2402786.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Sport & Culture',
    isCurrentEvent: true,
    isSponsored: false,
    partnerName: 'Grand Raid Réunion',
    partnerUrl: 'https://example.com/grand-raid',
    shortDescription: 'La Diagonale des Fous : 165 km et 10 000 mètres de dénivelé positif à travers les paysages les plus spectaculaires de l\'île.',
    storySlides: [
      'Créé en 1989, le Grand Raid est devenu l\'une des courses d\'ultra-trail les plus prestigieuses au monde. Chaque année en octobre, des milliers de coureurs se lancent dans cette aventure hors norme.',
      'La Diagonale des Fous traverse l\'île du sud au nord, de Saint-Philippe à Saint-Denis, en passant par les trois cirques. Les coureurs affrontent des dénivelés vertigineux, des conditions météo changeantes et l\'épuisement extrême.',
      'Au-delà de la performance sportive, le Grand Raid célèbre le dépassement de soi et l\'amour de la nature réunionnaise. Finir cette course est un accomplissement qui marque une vie.'
    ],
    fullText: 'Le Grand Raid propose plusieurs courses adaptées à différents niveaux, de la Mascareignes (60 km) à la mythique Diagonale des Fous (165 km). Les participants viennent du monde entier pour se mesurer aux montagnes réunionnaises. L\'ambiance est unique : malgré la difficulté extrême, la solidarité entre coureurs est omniprésente. Les bénévoles, aux ravitaillements et sur les parcours, forment une chaîne humaine extraordinaire. Les paysages traversés sont d\'une beauté à couper le souffle : forêts primaires, remparts vertigineux, plaines lunaires, villages de montagne. Pour beaucoup, participer au Grand Raid est un rêve, une quête personnelle qui demande des mois de préparation. Cet événement incarne l\'esprit combatif et généreux des Réunionnais.'
  },
  {
    slug: 'cite-du-volcan',
    title: 'La Cité du Volcan',
    subtitle: 'Un musée interactif pour comprendre le volcanisme réunionnais',
    image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Culture & Patrimoine',
    isCurrentEvent: false,
    isSponsored: true,
    partnerName: 'Cité du Volcan',
    partnerUrl: 'https://example.com/cite-volcan',
    shortDescription: 'Plongez au cœur du volcan grâce à des expériences immersives et des expositions scientifiques fascinantes.',
    storySlides: [
      'Située à la Plaine-des-Cafres, la Cité du Volcan est un musée moderne entièrement dédié au volcanisme. Grâce à des dispositifs interactifs et immersifs, les visiteurs découvrent les secrets du Piton de la Fournaise.',
      'Le parcours muséographique permet de comprendre la formation de La Réunion, les mécanismes des éruptions et l\'impact du volcan sur la vie quotidienne. Des simulateurs reproduisent les tremblements de terre et les coulées de lave.',
      'La Cité du Volcan travaille en étroite collaboration avec l\'Observatoire Volcanologique pour présenter les dernières découvertes scientifiques. C\'est un lieu d\'apprentissage et d\'émerveillement pour petits et grands.'
    ],
    fullText: 'Inaugurée en 2014, la Cité du Volcan a remplacé l\'ancien musée du volcan. Elle propose un voyage au centre de la Terre à travers des salles thématiques spectaculaires. Les visiteurs peuvent marcher sur une coulée de lave reconstituée, observer des échantillons de roches volcaniques et visionner des films saisissants sur les éruptions historiques. Un tunnel de 30 mètres plonge le visiteur dans l\'obscurité et la chaleur d\'une chambre magmatique. La salle de surveillance reproduit le centre de contrôle de l\'observatoire, montrant comment les scientifiques surveillent l\'activité volcanique en temps réel. C\'est une expérience éducative exceptionnelle qui permet de comprendre pourquoi La Réunion est une terre vivante, en constante évolution, et pourquoi le volcan fait partie intégrante de l\'identité réunionnaise.'
  },
  {
    slug: 'musee-villele',
    title: 'Le Musée Historique de Villèle',
    subtitle: 'Mémoire de l\'esclavage et du patrimoine colonial',
    image: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Culture & Patrimoine',
    isCurrentEvent: false,
    isSponsored: true,
    partnerName: 'Département de La Réunion',
    partnerUrl: 'https://example.com/musee-villele',
    shortDescription: 'Ancien domaine colonial devenu lieu de mémoire, le musée de Villèle raconte l\'histoire complexe de La Réunion.',
    storySlides: [
      'Le domaine de Villèle fut au XIXe siècle la plus riche propriété de l\'île, appartenant à la famille Desbassyns. Le musée occupe aujourd\'hui la chapelle et les dépendances de cette ancienne plantation.',
      'Les collections retracent la vie quotidienne à l\'époque coloniale, tant celle des maîtres que celle des esclaves. Des objets, documents et reconstitutions donnent à voir cette société hiérarchisée et brutale.',
      'Le musée joue un rôle essentiel dans la transmission de la mémoire de l\'esclavage. Il honore les victimes de ce système et aide à comprendre comment cette histoire a façonné La Réunion d\'aujourd\'hui.'
    ],
    fullText: 'Créé en 1974, le Musée Historique de Villèle est installé dans l\'ancienne chapelle du domaine Panon-Desbassyns. Le site comprend également un jardin créole traditionnel et les vestiges des anciennes dépendances. Les expositions permanentes présentent du mobilier d\'époque, des outils agricoles, des documents d\'archives et des œuvres d\'art. Une section importante est consacrée à l\'histoire de l\'esclavage à La Réunion, avec des témoignages, des chaînes, des actes de vente d\'esclaves et des récits de résistance. Le musée organise régulièrement des expositions temporaires, des conférences et des ateliers pédagogiques. C\'est un lieu de recueillement et de réflexion, où l\'on vient se souvenir, apprendre et se questionner sur notre héritage commun. La visite de Villèle est indispensable pour quiconque souhaite comprendre l\'âme réunionnaise.'
  }
];

export const getCurrentEventStories = () => stories.filter(s => s.isCurrentEvent);
export const getSponsoredStories = () => stories.filter(s => s.isSponsored);
export const getPermanentStories = () => stories;
export const getStoryBySlug = (slug: string) => stories.find(s => s.slug === slug);
