# Notes App - Flutter Note-Taking Application

A Flutter note-taking application with a **whole-note highlighting** feature that allows users to mark important notes for quick identification.

## Features

### Core Features
- Create, edit, and delete notes
- Plain text notes with title and content
- Notes sorted by most recently updated
- Pull-to-refresh in notes list

### Highlighting Feature
- **Toggle highlight**: Mark any note as "Highlighted" from the note detail screen using the star icon in the app bar
- **Visual indicators**: 
  - Notes list: Yellow border, background, and "Highlighted" badge with star icon
  - Note detail: Yellow banner at the top with "Highlighted" label
- **Accessibility**: Text labels accompany all color indicators (not color-only)
- **Persistence**: Highlight state persists across app restarts
- **Quick toggle**: Tap the star icon or long-press a note in the list

## Architecture

```
lib/
├── main.dart                    # App entry point
├── models/
│   └── note.dart               # Note data model with isHighlighted field
├── providers/
│   └── notes_provider.dart     # State management with ChangeNotifier
├── screens/
│   ├── notes_list_screen.dart  # Main list view
│   └── note_detail_screen.dart # Note editing with highlight toggle
├── services/
│   └── database_service.dart   # SQLite persistence with migrations
├── theme/
│   └── app_theme.dart          # Theme configuration with highlight colors
└── widgets/
    ├── highlight_badge.dart         # "Highlighted" badge component
    ├── highlight_toggle_button.dart # Star toggle button
    └── note_list_item.dart          # Note list item with highlight styling
```

## Data Model

```dart
class Note {
  final int? id;
  final String title;
  final String content;
  final bool isHighlighted;  // Whole-note highlight state
  final DateTime createdAt;
  final DateTime updatedAt;
}
```

### Migration Strategy

The SQLite database includes safe migration support:
- **Version 1**: Initial schema (title, content, timestamps)
- **Version 2**: Adds `is_highlighted` column with `DEFAULT 0`

Existing notes automatically default to `isHighlighted = false` during migration.

## Theming

Highlight color tokens defined in `AppTheme`:
- `highlightYellow` - Primary yellow color
- `highlightBackgroundLight/Dark` - Background for highlighted notes
- `highlightBorderLight/Dark` - Border color for highlighted cards

Both light and dark themes are supported with appropriate color variants.

## Accessibility

- All highlight indicators include text labels ("Highlighted")
- Semantic labels for screen readers (TalkBack/VoiceOver)
- Tooltips on toggle buttons
- Sufficient color contrast in both themes

## Testing

The app includes comprehensive tests:

### Unit Tests
- Note model: default values, copyWith, serialization, migration handling
- NotesProvider: CRUD operations, toggle highlight, optimistic updates, rollback on failure

### Widget Tests
- HighlightBadge: rendering, text labels, theming
- HighlightToggleButton: state display, tooltips, loading state, accessibility
- NoteListItem: highlight marker display, semantic labels

### Integration Tests
- Complete highlight toggle flow
- Persistence after navigation
- Accessibility semantics

Run tests:
```bash
flutter test                    # Run all tests
flutter test test/unit/         # Unit tests only
flutter test test/widget/       # Widget tests only
```

## Getting Started

1. Ensure Flutter is installed (3.24.5 or later)
2. Clone the repository
3. Run `flutter pub get`
4. Run `flutter run`

## Analytics Events

The app logs the following analytics events (currently to debug console):
- `note_highlighted`: When a note is marked as highlighted
- `note_unhighlighted`: When highlight is removed

These can be connected to an analytics provider in production.

## Future Enhancements (Post-MVP)

- Sort/filter by highlighted status
- Multiple highlight colors
- Bulk highlight/unhighlight actions
- Cloud sync support
