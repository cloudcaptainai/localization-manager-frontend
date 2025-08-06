import * as duckdb from '@duckdb/duckdb-wasm';

let db: duckdb.AsyncDuckDB | null = null;
let connection: duckdb.AsyncDuckDBConnection | null = null;

export interface LocalizationEntry {
  id: string;
  key: string;
  en: string;
  es: string;
  fr: string;
  de: string;
  ja: string;
  zh: string;
  created_at?: string;
  updated_at?: string;
}

// Simple database class for CRUD operations
export class LocalizationDB {
  private static instance: LocalizationDB;
  
  static getInstance(): LocalizationDB {
    if (!LocalizationDB.instance) {
      LocalizationDB.instance = new LocalizationDB();
    }
    return LocalizationDB.instance;
  }

  async init(): Promise<void> {
    if (db) return;
    await initializeDatabase();
  }

  async getAll(): Promise<LocalizationEntry[]> {
    await this.init();
    return getAllLocalizations();
  }

  async update(id: string, field: string, value: string): Promise<void> {
    await this.init();
    return updateLocalization(id, field, value);
  }

  async create(entry: Omit<LocalizationEntry, 'created_at' | 'updated_at'>): Promise<void> {
    await this.init();
    return createLocalization(entry);
  }

  async delete(id: string): Promise<void> {
    await this.init();
    return deleteLocalization(id);
  }

  async getTranslations(locale: string): Promise<Record<string, string>> {
    await this.init();
    return getTranslations(locale);
  }
}

export async function initializeDatabase(): Promise<void> {
  if (db) return; // Already initialized

  try {
    // Initialize DuckDB with local files
    const MANUAL_BUNDLES: duckdb.DuckDBBundles = {
      mvp: {
        mainModule: '/duckdb-mvp.wasm',
        mainWorker: '/duckdb-browser-mvp.worker.js',
      },
      eh: {
        mainModule: '/duckdb-eh.wasm',
        mainWorker: '/duckdb-browser-eh.worker.js',
      },
    };

    const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);
    
    // Create worker with error handling
    let worker: Worker;
    try {
      worker = new Worker(bundle.mainWorker!);
    } catch (workerError) {
      console.error('Failed to create worker:', workerError);
      throw new Error(`Failed to load DuckDB worker. Please ensure the application is served over HTTPS or from localhost.`);
    }
    
    const logger = new duckdb.ConsoleLogger();
    
    db = new duckdb.AsyncDuckDB(logger, worker);
    await db.instantiate(bundle.mainModule);
    
    connection = await db.connect();

    // Create the localization table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS localizations (
        id VARCHAR PRIMARY KEY,
        key VARCHAR UNIQUE NOT NULL,
        en TEXT DEFAULT '',
        es TEXT DEFAULT '',
        fr TEXT DEFAULT '',
        de TEXT DEFAULT '',
        ja TEXT DEFAULT '',
        zh TEXT DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert initial data if table is empty
    const countResult = await connection.query('SELECT COUNT(*) as count FROM localizations');
    const count = countResult.toArray()[0].count;
    
    if (count === 0) {
      await seedInitialData();
    }

    console.log('DuckDB initialized successfully');
  } catch (error) {
    console.error('Failed to initialize DuckDB:', error);
    throw error;
  }
}

async function seedInitialData(): Promise<void> {
  if (!connection) throw new Error('Database not initialized');

  const initialData = [
    {
      id: '1',
      key: 'welcome.title',
      en: 'Welcome to our app',
      es: 'Bienvenido a nuestra aplicación',
      fr: 'Bienvenue dans notre application',
      de: 'Willkommen in unserer App',
      ja: '私たちのアプリへようこそ',
      zh: '欢迎使用我们的应用'
    },
    {
      id: '2',
      key: 'button.submit',
      en: 'Submit',
      es: 'Enviar',
      fr: 'Soumettre',
      de: 'Absenden',
      ja: '送信',
      zh: '提交'
    },
    {
      id: '3',
      key: 'error.validation',
      en: 'Please check your input',
      es: 'Por favor verifica tu entrada',
      fr: 'Veuillez vérifier votre saisie',
      de: 'Bitte überprüfen Sie Ihre Eingabe',
      ja: '入力内容を確認してください',
      zh: '请检查您的输入'
    },
    {
      id: '4',
      key: 'navigation.home',
      en: 'Home',
      es: 'Inicio',
      fr: 'Accueil',
      de: 'Startseite',
      ja: 'ホーム',
      zh: '首页'
    },
    {
      id: '5',
      key: 'form.email',
      en: 'Email Address',
      es: 'Dirección de correo',
      fr: 'Adresse e-mail',
      de: 'E-Mail-Adresse',
      ja: 'メールアドレス',
      zh: '电子邮件地址'
    }
  ];

  for (const entry of initialData) {
    await connection.query(`
      INSERT INTO localizations (id, key, en, es, fr, de, ja, zh)
      VALUES ('${entry.id}', '${entry.key}', '${entry.en}', '${entry.es}', '${entry.fr}', '${entry.de}', '${entry.ja}', '${entry.zh}')
    `);
  }
}

export async function getAllLocalizations(): Promise<LocalizationEntry[]> {
  if (!connection) {
    await initializeDatabase();
  }
  
  const result = await connection!.query('SELECT * FROM localizations ORDER BY key');
  return result.toArray() as LocalizationEntry[];
}

export async function updateLocalization(id: string, field: string, value: string): Promise<void> {
  if (!connection) {
    await initializeDatabase();
  }

  // Validate field to prevent SQL injection
  const validFields = ['key', 'en', 'es', 'fr', 'de', 'ja', 'zh'];
  if (!validFields.includes(field)) {
    throw new Error(`Invalid field: ${field}`);
  }

  // Escape single quotes in value
  const escapedValue = value.replace(/'/g, "''");
  
  await connection!.query(`
    UPDATE localizations 
    SET ${field} = '${escapedValue}', updated_at = CURRENT_TIMESTAMP 
    WHERE id = '${id}'
  `);
}

export async function createLocalization(entry: Omit<LocalizationEntry, 'created_at' | 'updated_at'>): Promise<void> {
  if (!connection) {
    await initializeDatabase();
  }

  // Escape single quotes in all string values
  const escapedEntry = {
    id: entry.id,
    key: entry.key.replace(/'/g, "''"),
    en: entry.en.replace(/'/g, "''"),
    es: entry.es.replace(/'/g, "''"),
    fr: entry.fr.replace(/'/g, "''"),
    de: entry.de.replace(/'/g, "''"),
    ja: entry.ja.replace(/'/g, "''"),
    zh: entry.zh.replace(/'/g, "''")
  };

  await connection!.query(`
    INSERT INTO localizations (id, key, en, es, fr, de, ja, zh)
    VALUES ('${escapedEntry.id}', '${escapedEntry.key}', '${escapedEntry.en}', '${escapedEntry.es}', '${escapedEntry.fr}', '${escapedEntry.de}', '${escapedEntry.ja}', '${escapedEntry.zh}')
  `);
}

export async function deleteLocalization(id: string): Promise<void> {
  if (!connection) {
    await initializeDatabase();
  }

  await connection!.query(`DELETE FROM localizations WHERE id = '${id}'`);
}

export async function getTranslations(locale: string): Promise<Record<string, string>> {
  if (!connection) {
    await initializeDatabase();
  }

  // Validate locale to prevent SQL injection
  const validLocales = ['en', 'es', 'fr', 'de', 'ja', 'zh'];
  if (!validLocales.includes(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  const result = await connection!.query(`SELECT key, ${locale} as translation FROM localizations`);
  const rows = result.toArray();
  
  return rows.reduce((acc, row) => {
    acc[row.key] = row.translation || '';
    return acc;
  }, {} as Record<string, string>);
}

export function closeDatabase(): void {
  if (connection) {
    connection.close();
    connection = null;
  }
  if (db) {
    db.terminate();
    db = null;
  }
} 