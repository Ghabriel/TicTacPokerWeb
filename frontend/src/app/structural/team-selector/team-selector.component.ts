import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-team-selector',
    templateUrl: './team-selector.component.html',
    styleUrls: ['./team-selector.component.scss']
})
export class TeamSelectorComponent implements OnInit {
    @Input() initialTeam: number;
    @Output() changeTeam = new EventEmitter<number>();
    public teams: number[];
    public selectedTeam: number;

    private readonly numTeams = 4;

    constructor() { }

    ngOnInit() {
        this.teams = Array(this.numTeams);
        this.selectedTeam = this.initialTeam;
    }

    selectTeam(team: number): void {
        this.changeTeam.emit(team);
    }

}
