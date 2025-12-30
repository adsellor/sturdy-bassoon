/// Note model representing a note in the note-taking app.
///
/// Each note has a title, content, timestamps, and an [isHighlighted] flag
/// that allows users to mark important notes for quick identification.
class Note {
  /// Unique identifier for the note.
  final int? id;

  /// The title of the note.
  final String title;

  /// The main content/body of the note.
  final String content;

  /// Whether this note is marked as highlighted.
  ///
  /// When true, the note displays a yellow visual indicator in both
  /// the notes list and detail view to help users identify important notes.
  /// Defaults to false for new notes and existing notes during migration.
  final bool isHighlighted;

  /// Timestamp when the note was created.
  final DateTime createdAt;

  /// Timestamp when the note was last modified.
  final DateTime updatedAt;

  const Note({
    this.id,
    required this.title,
    required this.content,
    this.isHighlighted = false,
    required this.createdAt,
    required this.updatedAt,
  });

  /// Creates a copy of this Note with the given fields replaced.
  Note copyWith({
    int? id,
    String? title,
    String? content,
    bool? isHighlighted,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Note(
      id: id ?? this.id,
      title: title ?? this.title,
      content: content ?? this.content,
      isHighlighted: isHighlighted ?? this.isHighlighted,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  /// Converts the Note to a Map for database storage.
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'content': content,
      'is_highlighted': isHighlighted ? 1 : 0,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }

  /// Creates a Note from a Map retrieved from the database.
  ///
  /// Handles missing or null [is_highlighted] field gracefully by
  /// defaulting to false, ensuring safe migration of existing notes.
  factory Note.fromMap(Map<String, dynamic> map) {
    return Note(
      id: map['id'] as int?,
      title: map['title'] as String? ?? '',
      content: map['content'] as String? ?? '',
      // Safe migration: treat null or missing as false
      isHighlighted: (map['is_highlighted'] as int?) == 1,
      createdAt: map['created_at'] != null
          ? DateTime.parse(map['created_at'] as String)
          : DateTime.now(),
      updatedAt: map['updated_at'] != null
          ? DateTime.parse(map['updated_at'] as String)
          : DateTime.now(),
    );
  }

  /// Converts the Note to JSON format for serialization.
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'content': content,
      'isHighlighted': isHighlighted,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }

  /// Creates a Note from JSON data.
  ///
  /// Handles missing or null [isHighlighted] field by defaulting to false,
  /// ensuring backward compatibility with older data formats.
  factory Note.fromJson(Map<String, dynamic> json) {
    return Note(
      id: json['id'] as int?,
      title: json['title'] as String? ?? '',
      content: json['content'] as String? ?? '',
      // Coerce missing or null to false for backward compatibility
      isHighlighted: json['isHighlighted'] as bool? ?? false,
      createdAt: json['createdAt'] != null
          ? DateTime.parse(json['createdAt'] as String)
          : DateTime.now(),
      updatedAt: json['updatedAt'] != null
          ? DateTime.parse(json['updatedAt'] as String)
          : DateTime.now(),
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is Note &&
        other.id == id &&
        other.title == title &&
        other.content == content &&
        other.isHighlighted == isHighlighted &&
        other.createdAt == createdAt &&
        other.updatedAt == updatedAt;
  }

  @override
  int get hashCode {
    return Object.hash(
      id,
      title,
      content,
      isHighlighted,
      createdAt,
      updatedAt,
    );
  }

  @override
  String toString() {
    return 'Note(id: $id, title: $title, isHighlighted: $isHighlighted)';
  }
}
