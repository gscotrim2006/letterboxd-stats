import { Component, Input, inject } from '@angular/core';
import { StatItem } from '../../models/movie.model';
import { NgxEchartsDirective } from 'ngx-echarts';
import { State } from '../../services/state';
import { THEME}  from '../../constants/theme';

@Component({
  imports: [NgxEchartsDirective],
  selector: 'app-genres',
  styleUrl: './genres.scss',
  templateUrl: './genres.html',
})
export class Genres {
  //@Input() genres: StatItem[] = []; -> migrou para StateService;

  readonly stateService = inject(State);

  // pieData transforma os dados;
  // chartOptions monta a configuração completa usando pieData;

  get pieData() {
    return this.stateService.stats_data()?.genres.map(item => ({
      name: item.term,
      value: item.count
    }));
  }

  get chartOptions() {
    return {
      tooltip: { trigger: 'item' },
      legend: {
        orient: 'vertical',
        right: '5%',
        top: 'center',
        formatter: (name: string) => {
          const item = this.stateService.stats_data()?.genres
            .find(g => g.term === name);
          return `${name}: ${item?.count ?? 0}`;
        }
      },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: { show: false },
        data: this.pieData  // usa o getter acima
      }],
      color: [
        THEME.orange, THEME.green, THEME.blue,
        '#E63946', '#A8DADC', '#457B9D',
        '#F4A261', '#2A9D8F', '#E9C46A',
        '#264653', '#F72585', '#7209B7',
        '#3A86FF', '#FB5607', '#8338EC'
      ],
    };
  }
}
