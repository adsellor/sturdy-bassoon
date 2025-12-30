import 'package:flutter/material.dart';
import '../models/note.dart';
import '../theme/app_theme.dart';
import 'highlight_badge.dart';

/// A list item widget for displaying a note in the notes list.
///
/// Shows the note title, a preview of the content, and a highlight
/// indicator if the note is marked as highlighted. The highlight
/// indicator includes both color and text for accessibility.
class NoteListItem extends StatelessWidget {
  final Note note;
  final VoidCallback onTap;
  final VoidCallback? onLongPress;

  const NoteListItem({
    super.key,
    required this.note,
    required this.onTap,
    this.onLongPress,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    return Semantics(
      label: _buildSemanticLabel(),
      child: Card(
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
          side: note.isHighlighted
              ? BorderSide(
                  color: AppTheme.getHighlightBorder(context),
                  width: 2,
                )
              : BorderSide.none,
        ),
        color: note.isHighlighted
            ? AppTheme.getHighlightBackground(context)
            : null,
        child: InkWell(
          onTap: onTap,
          onLongPress: onLongPress,
          borderRadius: BorderRadius.circular(12),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Text(
                        note.title.isEmpty ? 'Untitled' : note.title,
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    if (note.isHighlighted) ...[
                      const SizedBox(width: 8),
                      const HighlightBadge(compact: true),
                    ],
                  ],
                ),
                if (note.content.isNotEmpty) ...[
                  const SizedBox(height: 8),
                  Text(
                    note.content,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: theme.colorScheme.onSurface.withOpacity(0.7),
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
                const SizedBox(height: 8),
                Text(
                  _formatDate(note.updatedAt),
                  style: theme.textTheme.bodySmall?.copyWith(
                    color: theme.colorScheme.onSurface.withOpacity(0.5),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  String _buildSemanticLabel() {
    final highlightStatus = note.isHighlighted ? ', highlighted' : '';
    final title = note.title.isEmpty ? 'Untitled note' : note.title;
    return 'Note: $title$highlightStatus';
  }

  String _formatDate(DateTime date) {
    final now = DateTime.now();
    final difference = now.difference(date);

    if (difference.inDays == 0) {
      if (difference.inHours == 0) {
        if (difference.inMinutes == 0) {
          return 'Just now';
        }
        return '${difference.inMinutes} min ago';
      }
      return '${difference.inHours}h ago';
    } else if (difference.inDays == 1) {
      return 'Yesterday';
    } else if (difference.inDays < 7) {
      return '${difference.inDays} days ago';
    } else {
      return '${date.day}/${date.month}/${date.year}';
    }
  }
}
