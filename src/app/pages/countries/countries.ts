import { Component, inject, OnInit, effect, signal } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import * as echarts from 'echarts';
import { THEME } from '../../constants/theme';
import { State } from '../../services/state';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-countries',
  imports: [NgxEchartsDirective],
  templateUrl: './countries.html',
  styleUrl: './countries.scss'
})
export class Countries implements OnInit {
  readonly stateService = inject(State);
  private http = inject(HttpClient);

  chartOptions = signal<any>({});

  private chartInstance: echarts.ECharts | null = null;

  private mapRegistered = false;

  constructor() {
    effect(() => {
      const stats = this.stateService.stats_data();
      if (stats && this.mapRegistered) {
        this.buildChart();
      }
    });
  }

  ngOnInit(): void {
    this.http.get('world.json').subscribe(geoJson => {
      console.log('GeoJSON carregado:', geoJson);
      echarts.registerMap('world', geoJson as any);
      console.log('Mapa registrado');
      this.mapRegistered = true;
      this.buildChart();
    });
  }

  buildChart(): void {
    const data = this.stateService.stats_data()?.countries ?? [];

    console.log('buildChart rodou, data:', data.length, 'itens');
    console.log('chartOptions series:', this.chartOptions().series);
    console.log('Countries data:', data);
    console.log('Data length:', data.length);

    const option: echarts.EChartsOption = {
      title: { 
        text: 'MOVIES WATCHED AROUND THE WORLD',
        left: 'center',
        textStyle: {
          color: THEME.text
        }
      },
      visualMap: {
        type: 'piecewise',
        pieces: [
          { min: 0, max: 0, color: THEME.grayMap },
          { min: 1, max: 10, color: THEME.blue },
          { min: 11, max: 100, color: THEME.green },
          { min: 101, color: THEME.orange },
        ]
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const value = isNaN(params.value) || params.value == null ? 0 : params.value; 
          return `${params.name}: ${value} film${value !== 1 ? 's' : ''}`;
        }
      },
      series: [{
        type: 'map',
        map: 'world',
        roam: true, // permite zoom + mapa livre;
        scaleLimit: {
          min: 1.1,   // limite mínimo de afastamento
          max: 4      // limite máximo de aproximação
        },
        itemStyle: {
          areaColor: THEME.grayMap,  // países sem dado
          borderColor: THEME.text,   // fronteiras
        },
        data: data.map(item => ({ name: item.term, value: item.count }))
      }]
    }

    this.chartOptions.set(option);
  }
  

  onChartInit(chart: echarts.ECharts): void {
    this.chartInstance = chart;
    
    chart.on('georoam', (params: any) => {
      if (params.zoom !== undefined) {
        const currentOption = chart.getOption() as any;
        const currentZoom = currentOption.series?.[0]?.zoom;
        
        if (currentZoom !== undefined && currentZoom <= 1) {
          chart.setOption({
            series: [{ zoom: 1, center: [0, 20] }]
          });
        }
      }
    });
  }
  
  resetZoom(): void {
    if (this.chartInstance) {
      this.chartInstance.setOption({
        series: [{ zoom: 1, center: undefined }]
      });
    }
  }
}