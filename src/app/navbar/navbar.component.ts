import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  navItems: NavItem[] = [
    { label: 'Dashboard', route: '/dashboard', active: true },
    { label: 'Systems', route: '/systems' },
    { label: 'Analytics', route: '/analytics' },
    { label: 'Alerts', route: '/alerts' },
    { label: 'Releases', route: '/releases' },
    { label: 'Configurations', route: '/configurations' },
    { label: 'Crash Reports', route: '/crash-reports' },
    { label: 'Devices', route: '/devices' },
    { label: 'Warehouse', route: '/warehouse' },
    { label: 'FT', route: '/ft' }
  ];
}