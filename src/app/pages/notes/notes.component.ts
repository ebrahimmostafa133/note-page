import { Note, NoteService } from './../../core/services/note.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideNavComponent } from "../../components/side-nav/side-nav.component";
import { DialogComponent, DialogData } from '../../components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, SideNavComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  searchQuery: string = '';

  constructor(private noteService: NoteService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUserNotes();
  }

  // ✅ Fetch all notes for logged-in user
  getUserNotes() {
    this.noteService.getUserNotes().subscribe({
      next: (res: any) => {
        this.notes = res.notes || res; // depends on backend response shape
        this.filteredNotes = [...this.notes];
      },
      error: (err) => {
        console.error('Error fetching notes:', err);
      }
    });
  }

  // ✅ Search filter
  searchNotes() {
    if (this.searchQuery.trim() === '') {
      this.filteredNotes = [...this.notes];
    } else {
      this.filteredNotes = this.notes.filter(note =>
        note.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  // ✅ Delete note
  deleteNote(id: string) {
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.notes = this.notes.filter(note => note._id !== id);
        this.filteredNotes = this.filteredNotes.filter(note => note._id !== id);
      },
      error: (err) => {
        console.error('Error deleting note:', err);
      }
    });
  }

  // ✅ Add / Edit Note (open dialog placeholder)
  openDialog(note?: Note): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: note ? { title: note.title, content: note.content } : { title: '', content: '' },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: DialogData) => {
      if (result) {
        if (note && note._id) {
          // Update existing note
          this.noteService.updateNote(note._id, result).subscribe({
            next: () => this.getUserNotes(),
            error: (err) => console.error('Error updating note:', err),
          });
        } else {
          // Add new note
          this.noteService.addNote(result).subscribe({
            next: () => this.getUserNotes(),
            error: (err) => console.error('Error adding note:', err),
          });
        }
      }
    });
  }
}
