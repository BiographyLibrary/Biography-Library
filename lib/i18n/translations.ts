export type Language = 'en' | 'it' | 'fr' | 'de';

export interface Translations {
  common: {
    loading: string;
    saving: string;
    saved: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    create: string;
    back: string;
    close: string;
    confirm: string;
  };
  nav: {
    dashboard: string;
    biography: string;
    settings: string;
    logout: string;
  };
  auth: {
    login: string;
    register: string;
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    signIn: string;
    signUp: string;
    loggingIn: string;
    creatingAccount: string;
  };
  dashboard: {
    title: string;
    createBiography: string;
    loadDemo: string;
    noBiographies: string;
    noBiographiesSubtitle: string;
    totalBiographies: string;
    wordsWritten: string;
    completedSections: string;
    lastUpdated: string;
    draft: string;
    completed: string;
    private: string;
    family: string;
    public: string;
  };
  biography: {
    newBiography: string;
    biographyTitle: string;
    titlePlaceholder: string;
    selectLanguage: string;
    privacyLevel: string;
    createButton: string;
    creating: string;
    deleteTitle: string;
    deleteMessage: string;
    deleting: string;
    sections: string;
    todos: string;
    aiSuggestions: string;
    shareLink: string;
    exportPdf: string;
    exporting: string;
  };
  sections: {
    earlyYears: string;
    family: string;
    education: string;
    career: string;
    relationships: string;
    achievements: string;
    challenges: string;
    hobbies: string;
    wisdom: string;
    legacy: string;
    noContent: string;
    noContentHint: string;
    startWriting: string;
  };
  ai: {
    suggestions: string;
    improve: string;
    expand: string;
    grammar: string;
    guidedPrompt: string;
    generating: string;
    noSuggestions: string;
  };
  voice: {
    startRecording: string;
    stopRecording: string;
    recording: string;
    transcribing: string;
  };
  share: {
    publicLink: string;
    copyLink: string;
    linkCopied: string;
    generateLink: string;
    generating: string;
  };
  footer: {
    hostedInSwitzerland: string;
    disclaimer: string;
  };
  welcome: {
    title: string;
    subtitle: string;
    selectLanguage: string;
    continue: string;
  };
  toast: {
    biographySaved: string;
    biographyCreated: string;
    biographyDeleted: string;
    pdfExported: string;
    linkCopied: string;
    demoLoaded: string;
    error: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      loading: 'Loading...',
      saving: 'Saving...',
      saved: 'Saved',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      back: 'Back',
      close: 'Close',
      confirm: 'Confirm',
    },
    nav: {
      dashboard: 'Dashboard',
      biography: 'Biography',
      settings: 'Settings',
      logout: 'Logout',
    },
    auth: {
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      name: 'Name',
      confirmPassword: 'Confirm Password',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      signIn: 'Sign in',
      signUp: 'Sign up',
      loggingIn: 'Logging in...',
      creatingAccount: 'Creating account...',
    },
    dashboard: {
      title: 'My Biographies',
      createBiography: 'Create New Biography',
      loadDemo: 'Load Demo Biography',
      noBiographies: 'Start preserving your story',
      noBiographiesSubtitle: 'Create your first biography or load a demo to explore features',
      totalBiographies: 'Total Biographies',
      wordsWritten: 'Words Written',
      completedSections: 'Completed Sections',
      lastUpdated: 'Last Updated',
      draft: 'Draft',
      completed: 'Completed',
      private: 'Private',
      family: 'Family',
      public: 'Public',
    },
    biography: {
      newBiography: 'New Biography',
      biographyTitle: 'Biography Title',
      titlePlaceholder: 'e.g., My Life Story, Grandma\'s Memories',
      selectLanguage: 'Content Language',
      privacyLevel: 'Privacy Level',
      createButton: 'Create Biography',
      creating: 'Creating...',
      deleteTitle: 'Delete Biography',
      deleteMessage: 'Are you sure you want to delete this biography? This action cannot be undone.',
      deleting: 'Deleting...',
      sections: 'Sections',
      todos: 'To-Do',
      aiSuggestions: 'AI Suggestions',
      shareLink: 'Share Link',
      exportPdf: 'Export PDF',
      exporting: 'Exporting...',
    },
    sections: {
      earlyYears: 'Early Years',
      family: 'Family Background',
      education: 'Education',
      career: 'Career',
      relationships: 'Relationships',
      achievements: 'Achievements',
      challenges: 'Challenges',
      hobbies: 'Hobbies & Interests',
      wisdom: 'Wisdom & Advice',
      legacy: 'Legacy',
      noContent: 'This section is empty',
      noContentHint: 'Start writing or use AI suggestions to help you get started',
      startWriting: 'Start writing your story here...',
    },
    ai: {
      suggestions: 'Suggestions',
      improve: 'Improve Writing',
      expand: 'Expand Content',
      grammar: 'Check Grammar',
      guidedPrompt: 'Get Writing Prompts',
      generating: 'Generating...',
      noSuggestions: 'Select a section to get AI suggestions',
    },
    voice: {
      startRecording: 'Start Recording',
      stopRecording: 'Stop Recording',
      recording: 'Recording',
      transcribing: 'Transcribing...',
    },
    share: {
      publicLink: 'Public Link',
      copyLink: 'Copy Link',
      linkCopied: 'Link Copied',
      generateLink: 'Generate Share Link',
      generating: 'Generating...',
    },
    footer: {
      hostedInSwitzerland: 'Biography Library Demo - Hosted in Switzerland 🇨🇭',
      disclaimer: 'This is a demo. Production version will use Infomaniak Swiss infrastructure.',
    },
    welcome: {
      title: 'Welcome to Biography Library',
      subtitle: 'Please select your preferred language',
      selectLanguage: 'Select Language',
      continue: 'Continue',
    },
    toast: {
      biographySaved: 'Biography saved successfully',
      biographyCreated: 'Biography created successfully',
      biographyDeleted: 'Biography deleted successfully',
      pdfExported: 'PDF exported successfully',
      linkCopied: 'Link copied to clipboard',
      demoLoaded: 'Demo biography loaded successfully',
      error: 'An error occurred',
    },
  },
  it: {
    common: {
      loading: 'Caricamento...',
      saving: 'Salvataggio...',
      saved: 'Salvato',
      save: 'Salva',
      cancel: 'Annulla',
      delete: 'Elimina',
      edit: 'Modifica',
      create: 'Crea',
      back: 'Indietro',
      close: 'Chiudi',
      confirm: 'Conferma',
    },
    nav: {
      dashboard: 'Dashboard',
      biography: 'Biografia',
      settings: 'Impostazioni',
      logout: 'Esci',
    },
    auth: {
      login: 'Accedi',
      register: 'Registrati',
      email: 'Email',
      password: 'Password',
      name: 'Nome',
      confirmPassword: 'Conferma Password',
      alreadyHaveAccount: 'Hai già un account?',
      dontHaveAccount: 'Non hai un account?',
      signIn: 'Accedi',
      signUp: 'Registrati',
      loggingIn: 'Accesso in corso...',
      creatingAccount: 'Creazione account...',
    },
    dashboard: {
      title: 'Le Mie Biografie',
      createBiography: 'Crea Nuova Biografia',
      loadDemo: 'Carica Biografia Demo',
      noBiographies: 'Inizia a preservare la tua storia',
      noBiographiesSubtitle: 'Crea la tua prima biografia o carica una demo per esplorare le funzionalità',
      totalBiographies: 'Biografie Totali',
      wordsWritten: 'Parole Scritte',
      completedSections: 'Sezioni Completate',
      lastUpdated: 'Ultimo Aggiornamento',
      draft: 'Bozza',
      completed: 'Completata',
      private: 'Privata',
      family: 'Famiglia',
      public: 'Pubblica',
    },
    biography: {
      newBiography: 'Nuova Biografia',
      biographyTitle: 'Titolo della Biografia',
      titlePlaceholder: 'es., La Mia Storia, I Ricordi della Nonna',
      selectLanguage: 'Lingua del Contenuto',
      privacyLevel: 'Livello di Privacy',
      createButton: 'Crea Biografia',
      creating: 'Creazione...',
      deleteTitle: 'Elimina Biografia',
      deleteMessage: 'Sei sicuro di voler eliminare questa biografia? Questa azione non può essere annullata.',
      deleting: 'Eliminazione...',
      sections: 'Sezioni',
      todos: 'Da Fare',
      aiSuggestions: 'Suggerimenti AI',
      shareLink: 'Condividi Link',
      exportPdf: 'Esporta PDF',
      exporting: 'Esportazione...',
    },
    sections: {
      earlyYears: 'Primi Anni',
      family: 'Origini Familiari',
      education: 'Istruzione',
      career: 'Carriera',
      relationships: 'Relazioni',
      achievements: 'Traguardi',
      challenges: 'Sfide',
      hobbies: 'Hobby e Interessi',
      wisdom: 'Saggezza e Consigli',
      legacy: 'Eredità',
      noContent: 'Questa sezione è vuota',
      noContentHint: 'Inizia a scrivere o usa i suggerimenti AI per aiutarti',
      startWriting: 'Inizia a scrivere la tua storia qui...',
    },
    ai: {
      suggestions: 'Suggerimenti',
      improve: 'Migliora il Testo',
      expand: 'Espandi Contenuto',
      grammar: 'Controlla Grammatica',
      guidedPrompt: 'Ottieni Spunti di Scrittura',
      generating: 'Generazione...',
      noSuggestions: 'Seleziona una sezione per ottenere suggerimenti AI',
    },
    voice: {
      startRecording: 'Inizia Registrazione',
      stopRecording: 'Ferma Registrazione',
      recording: 'Registrazione',
      transcribing: 'Trascrizione...',
    },
    share: {
      publicLink: 'Link Pubblico',
      copyLink: 'Copia Link',
      linkCopied: 'Link Copiato',
      generateLink: 'Genera Link di Condivisione',
      generating: 'Generazione...',
    },
    footer: {
      hostedInSwitzerland: 'Biography Library Demo - Ospitato in Svizzera 🇨🇭',
      disclaimer: 'Questa è una demo. La versione di produzione utilizzerà l\'infrastruttura svizzera di Infomaniak.',
    },
    welcome: {
      title: 'Benvenuto in Biography Library',
      subtitle: 'Seleziona la tua lingua preferita',
      selectLanguage: 'Seleziona Lingua',
      continue: 'Continua',
    },
    toast: {
      biographySaved: 'Biografia salvata con successo',
      biographyCreated: 'Biografia creata con successo',
      biographyDeleted: 'Biografia eliminata con successo',
      pdfExported: 'PDF esportato con successo',
      linkCopied: 'Link copiato negli appunti',
      demoLoaded: 'Biografia demo caricata con successo',
      error: 'Si è verificato un errore',
    },
  },
  fr: {
    common: {
      loading: 'Chargement...',
      saving: 'Enregistrement...',
      saved: 'Enregistré',
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      create: 'Créer',
      back: 'Retour',
      close: 'Fermer',
      confirm: 'Confirmer',
    },
    nav: {
      dashboard: 'Tableau de bord',
      biography: 'Biographie',
      settings: 'Paramètres',
      logout: 'Déconnexion',
    },
    auth: {
      login: 'Connexion',
      register: 'Inscription',
      email: 'Email',
      password: 'Mot de passe',
      name: 'Nom',
      confirmPassword: 'Confirmer le mot de passe',
      alreadyHaveAccount: 'Vous avez déjà un compte ?',
      dontHaveAccount: 'Vous n\'avez pas de compte ?',
      signIn: 'Se connecter',
      signUp: 'S\'inscrire',
      loggingIn: 'Connexion en cours...',
      creatingAccount: 'Création du compte...',
    },
    dashboard: {
      title: 'Mes Biographies',
      createBiography: 'Créer une Nouvelle Biographie',
      loadDemo: 'Charger une Biographie Démo',
      noBiographies: 'Commencez à préserver votre histoire',
      noBiographiesSubtitle: 'Créez votre première biographie ou chargez une démo pour explorer les fonctionnalités',
      totalBiographies: 'Biographies Totales',
      wordsWritten: 'Mots Écrits',
      completedSections: 'Sections Complétées',
      lastUpdated: 'Dernière Mise à Jour',
      draft: 'Brouillon',
      completed: 'Terminée',
      private: 'Privée',
      family: 'Famille',
      public: 'Publique',
    },
    biography: {
      newBiography: 'Nouvelle Biographie',
      biographyTitle: 'Titre de la Biographie',
      titlePlaceholder: 'ex., Mon Histoire, Les Souvenirs de Grand-mère',
      selectLanguage: 'Langue du Contenu',
      privacyLevel: 'Niveau de Confidentialité',
      createButton: 'Créer la Biographie',
      creating: 'Création...',
      deleteTitle: 'Supprimer la Biographie',
      deleteMessage: 'Êtes-vous sûr de vouloir supprimer cette biographie ? Cette action ne peut pas être annulée.',
      deleting: 'Suppression...',
      sections: 'Sections',
      todos: 'À Faire',
      aiSuggestions: 'Suggestions IA',
      shareLink: 'Lien de Partage',
      exportPdf: 'Exporter en PDF',
      exporting: 'Exportation...',
    },
    sections: {
      earlyYears: 'Premières Années',
      family: 'Contexte Familial',
      education: 'Éducation',
      career: 'Carrière',
      relationships: 'Relations',
      achievements: 'Réalisations',
      challenges: 'Défis',
      hobbies: 'Loisirs et Intérêts',
      wisdom: 'Sagesse et Conseils',
      legacy: 'Héritage',
      noContent: 'Cette section est vide',
      noContentHint: 'Commencez à écrire ou utilisez les suggestions IA pour vous aider',
      startWriting: 'Commencez à écrire votre histoire ici...',
    },
    ai: {
      suggestions: 'Suggestions',
      improve: 'Améliorer le Texte',
      expand: 'Développer le Contenu',
      grammar: 'Vérifier la Grammaire',
      guidedPrompt: 'Obtenir des Suggestions d\'Écriture',
      generating: 'Génération...',
      noSuggestions: 'Sélectionnez une section pour obtenir des suggestions IA',
    },
    voice: {
      startRecording: 'Démarrer l\'Enregistrement',
      stopRecording: 'Arrêter l\'Enregistrement',
      recording: 'Enregistrement',
      transcribing: 'Transcription...',
    },
    share: {
      publicLink: 'Lien Public',
      copyLink: 'Copier le Lien',
      linkCopied: 'Lien Copié',
      generateLink: 'Générer un Lien de Partage',
      generating: 'Génération...',
    },
    footer: {
      hostedInSwitzerland: 'Biography Library Demo - Hébergé en Suisse 🇨🇭',
      disclaimer: 'Ceci est une démo. La version de production utilisera l\'infrastructure suisse d\'Infomaniak.',
    },
    welcome: {
      title: 'Bienvenue dans Biography Library',
      subtitle: 'Veuillez sélectionner votre langue préférée',
      selectLanguage: 'Sélectionner la Langue',
      continue: 'Continuer',
    },
    toast: {
      biographySaved: 'Biographie enregistrée avec succès',
      biographyCreated: 'Biographie créée avec succès',
      biographyDeleted: 'Biographie supprimée avec succès',
      pdfExported: 'PDF exporté avec succès',
      linkCopied: 'Lien copié dans le presse-papiers',
      demoLoaded: 'Biographie démo chargée avec succès',
      error: 'Une erreur s\'est produite',
    },
  },
  de: {
    common: {
      loading: 'Laden...',
      saving: 'Speichern...',
      saved: 'Gespeichert',
      save: 'Speichern',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      create: 'Erstellen',
      back: 'Zurück',
      close: 'Schließen',
      confirm: 'Bestätigen',
    },
    nav: {
      dashboard: 'Dashboard',
      biography: 'Biografie',
      settings: 'Einstellungen',
      logout: 'Abmelden',
    },
    auth: {
      login: 'Anmelden',
      register: 'Registrieren',
      email: 'E-Mail',
      password: 'Passwort',
      name: 'Name',
      confirmPassword: 'Passwort bestätigen',
      alreadyHaveAccount: 'Haben Sie bereits ein Konto?',
      dontHaveAccount: 'Haben Sie noch kein Konto?',
      signIn: 'Anmelden',
      signUp: 'Registrieren',
      loggingIn: 'Anmeldung läuft...',
      creatingAccount: 'Konto wird erstellt...',
    },
    dashboard: {
      title: 'Meine Biografien',
      createBiography: 'Neue Biografie Erstellen',
      loadDemo: 'Demo-Biografie Laden',
      noBiographies: 'Beginnen Sie, Ihre Geschichte zu bewahren',
      noBiographiesSubtitle: 'Erstellen Sie Ihre erste Biografie oder laden Sie eine Demo, um die Funktionen zu erkunden',
      totalBiographies: 'Gesamte Biografien',
      wordsWritten: 'Geschriebene Wörter',
      completedSections: 'Abgeschlossene Abschnitte',
      lastUpdated: 'Zuletzt Aktualisiert',
      draft: 'Entwurf',
      completed: 'Abgeschlossen',
      private: 'Privat',
      family: 'Familie',
      public: 'Öffentlich',
    },
    biography: {
      newBiography: 'Neue Biografie',
      biographyTitle: 'Biografietitel',
      titlePlaceholder: 'z.B., Meine Lebensgeschichte, Omas Erinnerungen',
      selectLanguage: 'Inhaltssprache',
      privacyLevel: 'Datenschutzstufe',
      createButton: 'Biografie Erstellen',
      creating: 'Erstellen...',
      deleteTitle: 'Biografie Löschen',
      deleteMessage: 'Sind Sie sicher, dass Sie diese Biografie löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
      deleting: 'Löschen...',
      sections: 'Abschnitte',
      todos: 'Aufgaben',
      aiSuggestions: 'KI-Vorschläge',
      shareLink: 'Link Teilen',
      exportPdf: 'PDF Exportieren',
      exporting: 'Exportieren...',
    },
    sections: {
      earlyYears: 'Frühe Jahre',
      family: 'Familienhintergrund',
      education: 'Bildung',
      career: 'Karriere',
      relationships: 'Beziehungen',
      achievements: 'Erfolge',
      challenges: 'Herausforderungen',
      hobbies: 'Hobbys & Interessen',
      wisdom: 'Weisheit & Ratschläge',
      legacy: 'Vermächtnis',
      noContent: 'Dieser Abschnitt ist leer',
      noContentHint: 'Beginnen Sie zu schreiben oder verwenden Sie KI-Vorschläge zur Unterstützung',
      startWriting: 'Beginnen Sie hier, Ihre Geschichte zu schreiben...',
    },
    ai: {
      suggestions: 'Vorschläge',
      improve: 'Text Verbessern',
      expand: 'Inhalt Erweitern',
      grammar: 'Grammatik Prüfen',
      guidedPrompt: 'Schreibvorschläge Erhalten',
      generating: 'Generieren...',
      noSuggestions: 'Wählen Sie einen Abschnitt, um KI-Vorschläge zu erhalten',
    },
    voice: {
      startRecording: 'Aufnahme Starten',
      stopRecording: 'Aufnahme Stoppen',
      recording: 'Aufnahme',
      transcribing: 'Transkribieren...',
    },
    share: {
      publicLink: 'Öffentlicher Link',
      copyLink: 'Link Kopieren',
      linkCopied: 'Link Kopiert',
      generateLink: 'Freigabelink Generieren',
      generating: 'Generieren...',
    },
    footer: {
      hostedInSwitzerland: 'Biography Library Demo - Gehostet in der Schweiz 🇨🇭',
      disclaimer: 'Dies ist eine Demo. Die Produktionsversion wird die schweizerische Infomaniak-Infrastruktur verwenden.',
    },
    welcome: {
      title: 'Willkommen bei Biography Library',
      subtitle: 'Bitte wählen Sie Ihre bevorzugte Sprache',
      selectLanguage: 'Sprache Wählen',
      continue: 'Weiter',
    },
    toast: {
      biographySaved: 'Biografie erfolgreich gespeichert',
      biographyCreated: 'Biografie erfolgreich erstellt',
      biographyDeleted: 'Biografie erfolgreich gelöscht',
      pdfExported: 'PDF erfolgreich exportiert',
      linkCopied: 'Link in die Zwischenablage kopiert',
      demoLoaded: 'Demo-Biografie erfolgreich geladen',
      error: 'Ein Fehler ist aufgetreten',
    },
  },
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  it: 'Italiano',
  fr: 'Français',
  de: 'Deutsch',
};

export const languageFlags: Record<Language, string> = {
  en: '🇬🇧',
  it: '🇮🇹',
  fr: '🇫🇷',
  de: '🇩🇪',
};
