import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/note.dart';
import '../providers/notes_provider.dart';
import '../theme/app_theme.dart';
import '../widgets/highlight_badge.dart';
import '../widgets/highlight_toggle_button.dart';

/// Screen for viewing and editing a note.
///
/// Displays the note content with a highlight toggle in the app bar.
/// When a note is highlighted, shows a visual indicator (badge) below
/// the app bar. Provides immediate feedback when toggling highlight state.
class NoteDetailScreen extends StatefulWidget {
  /// The ID of the note to view/edit. Null for new notes.
  final int? noteId;

  const NoteDetailScreen({
    super.key,
    this.noteId,
  });

  @override
  State<NoteDetailScreen> createState() => _NoteDetailScreenState();
}

class _NoteDetailScreenState extends State<NoteDetailScreen> {
  late TextEditingController _titleController;
  late TextEditingController _contentController;
  bool _isLoading = false;
  bool _hasChanges = false;
  Note? _note;

  bool get isNewNote => widget.noteId == null;

  @override
  void initState() {
    super.initState();
    _titleController = TextEditingController();
    _contentController = TextEditingController();
    
    if (!isNewNote) {
      _loadNote();
    }

    _titleController.addListener(_onTextChanged);
    _contentController.addListener(_onTextChanged);
  }

  void _loadNote() {
    final note = context.read<NotesProvider>().getNoteById(widget.noteId!);
    if (note != null) {
      _note = note;
      _titleController.text = note.title;
      _contentController.text = note.content;
    }
  }

  void _onTextChanged() {
    if (!_hasChanges) {
      setState(() {
        _hasChanges = true;
      });
    }
  }

  @override
  void dispose() {
    _titleController.removeListener(_onTextChanged);
    _contentController.removeListener(_onTextChanged);
    _titleController.dispose();
    _contentController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: !_hasChanges,
      onPopInvokedWithResult: (didPop, result) async {
        if (didPop) return;
        
        final navigator = Navigator.of(context);
        final shouldSave = await _showUnsavedChangesDialog();
        if (shouldSave == true) {
          await _saveNote();
        }
        if (mounted) {
          navigator.pop();
        }
      },
      child: Consumer<NotesProvider>(
        builder: (context, notesProvider, child) {
          // Update note from provider to reflect highlight changes
          if (!isNewNote && widget.noteId != null) {
            _note = notesProvider.getNoteById(widget.noteId!);
          }
          
          final isHighlighted = _note?.isHighlighted ?? false;

          return Scaffold(
            appBar: AppBar(
              title: Text(isNewNote ? 'New Note' : 'Edit Note'),
              actions: [
                if (!isNewNote && _note != null)
                  HighlightToggleButton(
                    isHighlighted: isHighlighted,
                    isLoading: _isLoading,
                    onToggle: _toggleHighlight,
                  ),
                IconButton(
                  onPressed: _hasChanges ? _saveNote : null,
                  icon: const Icon(Icons.check),
                  tooltip: 'Save note',
                ),
              ],
            ),
            body: Column(
              children: [
                // Highlight indicator banner
                if (isHighlighted)
                  _buildHighlightBanner(context),
                
                // Note content
                Expanded(
                  child: _buildNoteContent(context),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildHighlightBanner(BuildContext context) {
    return Semantics(
      label: 'This note is highlighted',
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: AppTheme.getHighlightBackground(context),
          border: Border(
            bottom: BorderSide(
              color: AppTheme.getHighlightBorder(context),
              width: 1,
            ),
          ),
        ),
        child: Row(
          children: [
            const HighlightBadge(),
            const Spacer(),
            TextButton(
              onPressed: _toggleHighlight,
              child: const Text('Remove'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNoteContent(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Title field
          TextField(
            controller: _titleController,
            decoration: const InputDecoration(
              hintText: 'Title',
              border: InputBorder.none,
            ),
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
            textCapitalization: TextCapitalization.sentences,
            maxLines: null,
          ),
          const SizedBox(height: 8),
          const Divider(),
          const SizedBox(height: 8),
          // Content field
          TextField(
            controller: _contentController,
            decoration: const InputDecoration(
              hintText: 'Start typing your note...',
              border: InputBorder.none,
            ),
            style: Theme.of(context).textTheme.bodyLarge,
            textCapitalization: TextCapitalization.sentences,
            maxLines: null,
            minLines: 10,
            keyboardType: TextInputType.multiline,
          ),
        ],
      ),
    );
  }

  Future<void> _toggleHighlight() async {
    if (_note?.id == null) return;

    setState(() {
      _isLoading = true;
    });

    try {
      final success = await context.read<NotesProvider>().toggleHighlight(_note!.id!);
      
      if (!success && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Failed to update highlight status'),
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  Future<void> _saveNote() async {
    final title = _titleController.text.trim();
    final content = _contentController.text.trim();

    if (title.isEmpty && content.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Cannot save an empty note'),
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    setState(() {
      _isLoading = true;
    });

    try {
      final provider = context.read<NotesProvider>();
      bool success;

      if (isNewNote) {
        final newNote = await provider.createNote(
          title: title,
          content: content,
        );
        success = newNote != null;
        if (success && mounted) {
          _note = newNote;
        }
      } else {
        final updatedNote = _note!.copyWith(
          title: title,
          content: content,
        );
        success = await provider.updateNote(updatedNote);
      }

      if (mounted) {
        if (success) {
          setState(() {
            _hasChanges = false;
          });
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Note saved'),
              behavior: SnackBarBehavior.floating,
              duration: Duration(seconds: 1),
            ),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(provider.error ?? 'Failed to save note'),
              behavior: SnackBarBehavior.floating,
            ),
          );
        }
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  Future<bool?> _showUnsavedChangesDialog() {
    return showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Unsaved changes'),
        content: const Text('Do you want to save your changes before leaving?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Discard'),
          ),
          FilledButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Save'),
          ),
        ],
      ),
    );
  }
}
