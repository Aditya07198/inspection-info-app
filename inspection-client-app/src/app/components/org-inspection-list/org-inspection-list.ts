import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-org-inspection-list',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './org-inspection-list.html',
  styleUrl: './org-inspection-list.scss',
})
export class OrgInspectionList {
  inspectionList = [
    {
      name: 'john bob',
      address: '32 john st',
      email: 'abc@dsc.com',
      phone: '434-343-4343'
    },
    {
      name: 'john bob',
      address: '32 john st',
      email: 'abc@dsc.com',
      phone: '434-343-4343'
    },
    {
      name: 'xxx bob',
      address: '32 john st',
      email: 'abc@dsc.com',
      phone: '434-343-4343'
    },
    {
      name: 'yyy bob',
      address: '32 john st',
      email: 'abc@dsc.com',
      phone: '434-343-4343'
    },
    {
      name: 'ccc bob',
      address: '32 john st',
      email: 'abc@dsc.com',
      phone: '434-343-4343'
    }
  ]
}
