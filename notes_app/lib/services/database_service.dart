import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import '../models/note.dart';

/// Service for managing local database operations for notes.
///
/// Handles database initialization, migrations, and CRUD operations.
/// Uses SQLite for persistent storage with safe migration support.
class DatabaseService {
  static Database? _database;
  static const String _tableName = 'notes';
  static const int _databaseVersion = 2; // Version 2 adds is_highlighted column

  /// Gets the database instance, initializing it if necessary.
  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }

  /// Initializes the database with migrations.
  Future<Database> _initDatabase() async {
    final databasePath = await getDatabasesPath();
    final path = join(databasePath, 'notes.db');

    return await openDatabase(
      path,
      version: _databaseVersion,
      onCreate: _onCreate,
      onUpgrade: _onUpgrade,
    );
  }

  /// Creates the notes table for new installations.
  Future<void> _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE $_tableName (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        is_highlighted INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      )
    ''');
  }

  /// Handles database migrations between versions.
  ///
  /// Migration from version 1 to 2 adds the is_highlighted column
  /// with a default value of 0 (false) for all existing notes.
  Future<void> _onUpgrade(Database db, int oldVersion, int newVersion) async {
    if (oldVersion < 2) {
      // Add is_highlighted column with default value of 0 (false)
      // This ensures existing notes are not highlighted by default
      await db.execute('''
        ALTER TABLE $_tableName ADD COLUMN is_highlighted INTEGER NOT NULL DEFAULT 0
      ''');
    }
  }

  /// Inserts a new note into the database.
  ///
  /// Returns the ID of the newly created note.
  Future<int> insertNote(Note note) async {
    final db = await database;
    final map = note.toMap();
    map.remove('id'); // Let database auto-generate ID
    return await db.insert(_tableName, map);
  }

  /// Updates an existing note in the database.
  ///
  /// Returns the number of rows affected.
  Future<int> updateNote(Note note) async {
    final db = await database;
    return await db.update(
      _tableName,
      note.toMap(),
      where: 'id = ?',
      whereArgs: [note.id],
    );
  }

  /// Deletes a note from the database.
  ///
  /// Returns the number of rows affected.
  Future<int> deleteNote(int id) async {
    final db = await database;
    return await db.delete(
      _tableName,
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  /// Retrieves a single note by ID.
  ///
  /// Returns null if the note doesn't exist.
  Future<Note?> getNoteById(int id) async {
    final db = await database;
    final maps = await db.query(
      _tableName,
      where: 'id = ?',
      whereArgs: [id],
    );
    if (maps.isEmpty) return null;
    return Note.fromMap(maps.first);
  }

  /// Retrieves all notes ordered by updated date (most recent first).
  Future<List<Note>> getAllNotes() async {
    final db = await database;
    final maps = await db.query(
      _tableName,
      orderBy: 'updated_at DESC',
    );
    return maps.map((map) => Note.fromMap(map)).toList();
  }

  /// Updates only the highlight status of a note.
  ///
  /// This is an optimized method for toggling highlight state
  /// without updating the entire note record.
  Future<int> updateHighlightStatus(int id, bool isHighlighted) async {
    final db = await database;
    return await db.update(
      _tableName,
      {
        'is_highlighted': isHighlighted ? 1 : 0,
        'updated_at': DateTime.now().toIso8601String(),
      },
      where: 'id = ?',
      whereArgs: [id],
    );
  }

  /// Closes the database connection.
  Future<void> close() async {
    final db = await database;
    await db.close();
    _database = null;
  }
}
