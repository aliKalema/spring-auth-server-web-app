import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TreeType} from "../../interfaces/tree-type";
import {MaterialModule} from "../../../material/material.module";

@Component({
  selector: 'app-add-level',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './add-level.component.html',
  styleUrl: './add-level.component.css'
})
export class AddLevelComponent {
  constructor(private dialogRef: MatDialogRef<AddLevelComponent>,  @Inject(MAT_DIALOG_DATA) public data: TreeType) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  protected readonly TreeType = TreeType;
}
