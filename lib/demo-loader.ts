import { supabase } from './supabase';
import { Language } from './i18n/translations';

interface DemoContent {
  [key: string]: {
    title: string;
    content: string;
  };
}

const demoContentByLanguage: Record<Language, DemoContent> = {
  en: {
    'Early Years': {
      title: 'Early Years',
      content: 'I was born in a small coastal town on a crisp autumn morning in 1958. My childhood was filled with the smell of salt air and the sound of seagulls. Our family home stood on a hill overlooking the harbor, where fishing boats would come and go with the tides. My parents ran a small bookshop in town, which became my sanctuary and sparked my lifelong love of reading.'
    },
    'Family Background': {
      title: 'Family Background',
      content: 'My mother, Elizabeth, was a schoolteacher with a passion for literature. She would read to me every night, introducing me to worlds beyond our small town. My father, James, was a quiet man who expressed his love through actions rather than words. He taught me patience and the value of hard work. I have two younger siblings – my brother William and sister Margaret – and we were inseparable growing up.'
    },
    'Education': {
      title: 'Education',
      content: 'School came naturally to me, particularly languages and history. I won a scholarship to attend university in the city, where I studied English Literature. Those years away from home were transformative. I discovered new perspectives, made lifelong friends, and developed a deeper understanding of the world and my place in it.'
    },
    'Career': {
      title: 'Career',
      content: 'After graduating, I followed in my mother\'s footsteps and became a teacher. For thirty-five years, I had the privilege of working with young minds, watching them grow and discover their own passions. Teaching was never just a job to me – it was a calling. Many of my former students still keep in touch, and their successes bring me immense joy.'
    },
    'Relationships': {
      title: 'Relationships',
      content: 'I met my spouse, Thomas, at a poetry reading in 1982. We married two years later in a small ceremony by the sea. Our marriage of forty years has been built on mutual respect, shared values, and countless cups of tea while discussing everything from philosophy to gardening. We have three wonderful children and seven grandchildren who fill our lives with laughter and purpose.'
    },
  },
  it: {
    'Primi Anni': {
      title: 'Primi Anni',
      content: 'Sono nato in un piccolo paese di campagna in una fredda mattina d\'inverno del 1962. La mia infanzia è stata segnata dal profumo del pane appena sfornato dalla panetteria di mio nonno e dal suono delle campane della chiesa che scandivano le giornate. La nostra casa si trovava nella piazza principale, circondata da campi di ulivi e vigneti che si estendevano fino all\'orizzonte.'
    },
    'Origini Familiari': {
      title: 'Origini Familiari',
      content: 'Mia madre, Rosa, era una sarta talentuosa che creava abiti meravigliosi per le occasioni speciali del paese. Mio padre, Giuseppe, lavorava nella bottega del nonno producendo il miglior pane della regione. La domenica, tutta la famiglia si riuniva intorno al tavolo per lunghi pranzi che duravano ore, tra racconti e risate. Ho due sorelle più giovani, Maria e Francesca, con cui condivido ancora un legame profondo.'
    },
    'Istruzione': {
      title: 'Istruzione',
      content: 'A scuola ero particolarmente portato per la matematica e le scienze. Il mio insegnante delle superiori, il Professor Rossi, riconobbe il mio potenziale e mi incoraggiò a frequentare l\'università. Sono stato il primo della mia famiglia a conseguire una laurea, studiando ingegneria al Politecnico. Quegli anni hanno aperto la mia mente a possibilità che non avrei mai immaginato.'
    },
    'Carriera': {
      title: 'Carriera',
      content: 'La mia carriera nell\'ingegneria civile mi ha portato a lavorare su progetti in tutta Italia e oltre. Ho contribuito alla costruzione di ponti, edifici e infrastrutture che ancora oggi servono le comunità. Il lavoro è stato impegnativo ma gratificante, e mi ha insegnato l\'importanza della precisione e della dedizione. Dopo quarant\'anni, ho lasciato un\'eredità di opere che resistono al tempo.'
    },
    'Relazioni': {
      title: 'Relazioni',
      content: 'Ho incontrato mia moglie, Lucia, durante una festa di paese nell\'estate del 1985. Il suo sorriso illuminava la piazza. Ci siamo sposati l\'anno seguente nella chiesa dove i miei genitori si erano sposati trent\'anni prima. Abbiamo costruito una famiglia meravigliosa con quattro figli e ora otto nipoti che riempiono le nostre giornate di gioia e confusione.'
    },
  },
  fr: {
    'Premières Années': {
      title: 'Premières Années',
      content: 'Je suis né dans un petit village de Provence par une chaude journée d\'été en 1965. Mon enfance a été bercée par le chant des cigales et le parfum de la lavande qui entourait notre maison. Mon père cultivait des vignes et ma mère tenait un petit café sur la place du village où les habitants se réunissaient chaque matin.'
    },
    'Contexte Familial': {
      title: 'Contexte Familial',
      content: 'Ma mère, Marguerite, était une femme forte et bienveillante qui savait écouter chacun. Mon père, Pierre, était un homme passionné par son travail et par la terre. Il m\'a transmis son amour de la nature et son respect pour le travail bien fait. J\'ai un frère aîné, Jean-Claude, et une sœur cadette, Sophie, qui ont toujours été mes plus proches confidents.'
    },
    'Éducation': {
      title: 'Éducation',
      content: 'J\'ai toujours été curieux et avide d\'apprendre. Mes professeurs ont encouragé cette soif de connaissance. J\'ai quitté le village pour étudier l\'histoire et la philosophie à l\'Université de Lyon. Ces années d\'études ont façonné ma pensée et m\'ont ouvert à de nouvelles perspectives sur le monde et l\'humanité.'
    },
    'Carrière': {
      title: 'Carrière',
      content: 'Ma passion pour l\'histoire m\'a conduit à devenir conservateur de musée. Pendant trente ans, j\'ai eu la chance de travailler avec des objets et des documents qui racontent notre passé. Chaque pièce avait une histoire à raconter, et j\'ai consacré ma vie à préserver ces récits pour les générations futures. Ce travail m\'a comblé intellectuellement et spirituellement.'
    },
    'Relations': {
      title: 'Relations',
      content: 'J\'ai rencontré mon épouse, Céline, lors d\'une exposition au musée en 1988. Notre complicité a été immédiate. Nous nous sommes mariés deux ans plus tard dans la petite église du village où j\'ai grandi. Ensemble, nous avons élevé trois enfants merveilleux et accueilli maintenant six petits-enfants qui illuminent nos vies de leur énergie et leur innocence.'
    },
  },
  de: {
    'Frühe Jahre': {
      title: 'Frühe Jahre',
      content: 'Ich wurde 1960 in einem kleinen Dorf in den Alpen geboren, umgeben von majestätischen Bergen und grünen Tälern. Meine Kindheit war geprägt von langen Wanderungen in der Natur, dem Klang der Kuhglocken und dem Duft frisch gemähten Heus. Unser Familienhaus lag am Rande des Dorfes mit Blick auf schneebedeckte Gipfel, die das ganze Jahr über leuchteten.'
    },
    'Familienhintergrund': {
      title: 'Familienhintergrund',
      content: 'Meine Mutter, Anna, war Krankenschwester und eine fürsorgliche Frau, die immer für andere da war. Mein Vater, Franz, betrieb eine kleine Schreinerei und schuf wunderschöne Möbelstücke, die noch heute in vielen Häusern der Region stehen. Ich habe eine ältere Schwester, Brigitte, und einen jüngeren Bruder, Hans. Zusammen haben wir eine glückliche Kindheit in unserem Bergdorf verbracht.'
    },
    'Bildung': {
      title: 'Bildung',
      content: 'In der Schule faszinierten mich besonders die Naturwissenschaften und Mathematik. Mein Lehrer erkannte mein Talent und ermutigte mich, weiter zu studieren. Ich besuchte die Technische Universität in Zürich und studierte Architektur. Diese Jahre waren prägend – ich lernte, wie man Schönheit und Funktionalität verbindet und Räume schafft, die Menschen inspirieren.'
    },
    'Karriere': {
      title: 'Karriere',
      content: 'Als Architekt habe ich über dreißig Jahre lang an verschiedenen Projekten in der Schweiz und im Ausland gearbeitet. Von Wohnhäusern bis zu öffentlichen Gebäuden – jedes Projekt war eine neue Herausforderung und Chance, etwas Dauerhaftes zu schaffen. Die Arbeit lehrte mich Geduld, Präzision und die Bedeutung nachhaltigen Bauens. Meine Werke stehen noch heute als Zeugnis meiner Hingabe.'
    },
    'Beziehungen': {
      title: 'Beziehungen',
      content: 'Ich lernte meine Frau, Ursula, während eines Bergwanderwochenendes im Sommer 1984 kennen. Ihre Liebe zur Natur und ihr fröhliches Wesen zogen mich sofort an. Wir heirateten ein Jahr später in unserer Dorfkirche. Gemeinsam haben wir drei Kinder großgezogen und genießen nun das Leben mit unseren fünf Enkelkindern, die uns mit ihrer Lebensfreude jung halten.'
    },
  },
};

export async function loadDemoBiography(userId: string, language: Language): Promise<{ success: boolean; biographyId?: string; error?: string }> {
  try {
    const demoContent = demoContentByLanguage[language];
    const titles: Record<Language, string> = {
      en: 'Demo Biography: A Life Well Lived',
      it: 'Biografia Demo: Una Vita Ben Vissuta',
      fr: 'Biographie Démo: Une Vie Bien Vécue',
      de: 'Demo-Biografie: Ein Erfülltes Leben',
    };

    const { data: biography, error: bioError } = await supabase
      .from('biographies')
      .insert({
        user_id: userId,
        title: titles[language],
        privacy_level: 'public',
        status: 'draft',
        content_language: language,
        content: {},
      })
      .select()
      .single();

    if (bioError) {
      return { success: false, error: bioError.message };
    }

    const sectionsToInsert = Object.entries(demoContent).map(([_, section]) => ({
      biography_id: biography.id,
      section_name: section.title,
      content: section.content,
    }));

    const { error: sectionsError } = await supabase
      .from('biography_sections')
      .insert(sectionsToInsert);

    if (sectionsError) {
      await supabase.from('biographies').delete().eq('id', biography.id);
      return { success: false, error: sectionsError.message };
    }

    return { success: true, biographyId: biography.id };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred' };
  }
}
