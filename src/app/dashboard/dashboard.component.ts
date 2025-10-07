import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
interface StatCard {
  label: string;
  value: string;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
  legendLabel: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selectedDateRange = 'Jan 01, 2024 - Jan 30, 2024';

  statCards: StatCard[] = [
    { label: 'Total Systems Count', value: '6,449' },
    { label: 'Hybrid with Batteries', value: '3,563' },
    { label: 'Hybrid without Batteries', value: '1,488' },
    { label: 'On Grid', value: '1,398' }
  ];

  chartData: ChartData[] = [
    { label: 'Normal', value: 4929, color: '#7CB342', legendLabel: 'Normal' },
    { label: 'Offline', value: 242, color: '#9FA8B7', legendLabel: 'Offline' },
    { label: 'Faulty', value: 30, color: '#EF5350', legendLabel: 'Faulty' },
    { label: 'Maintenance', value: 72, color: '#FFC107', legendLabel: 'Maintenance' },
    { label: 'Down', value: 5, color: '#FF7043', legendLabel: 'Down' },
    { label: 'Under Installation', value: 4, color: '#5C6BC0', legendLabel: 'Under Installation' },
    { label: 'Excluded(P.S & W.B)', value: 222, color: '#42A5F5', legendLabel: 'Excluded(P.S & W.B)' },
    { label: 'Warranty Void', value: 77, color: '#29B6F6', legendLabel: 'Warranty Void' }
  ];

  maxValue = Math.max(...this.chartData.map(d => d.value));

  getBarHeight(value: number): number {
    return (value / this.maxValue) * 100;
  }

  getYAxisLabels(): number[] {
    const max = this.maxValue;
    const step = Math.ceil(max / 4 / 1000) * 1000;
    return [0, step, step * 2, step * 3, step * 4].reverse();
  }
}