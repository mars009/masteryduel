import {Component, OnInit, Input} from 'angular2/core';
import {Dictionary, ChampionDto, GameState, Style, Wrapper} from '../interfaces/interfaces';
import {ChampionData} from '../interfaces/data.interfaces';
import {LolApiService} from '../services/lolapi.service';
import {GameService} from '../services/game.service';

import $ from 'jquery';

/**
 * The root component of the application.
 * @author shawn
 */
@Component({
	selector: 'md-champion',
	templateUrl: 'app/templates/champion.xml',
	directives: []
})

export class ChampionComponent implements OnInit {
	@Input()
	public champData: ChampionData;

	public champName: string;
	public champImgUrl: string;
	public styles: Style;

	public hideControls: boolean;

	constructor(private game: GameService, private lolapi: LolApiService) {
	}

	public ngOnInit(): void {
		this.hideControls = true;
		this.champName = this.lolapi.getChampionDtoById(this.champData.champId).name;
		this.champImgUrl = this.lolapi.getChampionImageUrl(this.champData.champId);
		this.styles = this.game.getChampStyle(this.champData.uid);
	}

	public toggleControls(): void {
		if (this.champData.owner === this.game.getPlayerId()) {
			this.hideControls = !this.hideControls;
		}
	}

	public onAttackButtonClick(event: Event): void {
		if (this.game.registerChampionAttack(this.champData.uid)) {
			this.hideControls = true;
		}
		event.stopPropagation();
	}

	public onMoveButtonClick(event: Event): void {
		if (this.game.registerChampionMove(this.champData.uid)) {
			this.hideControls = true;
		}
		event.stopPropagation();
	}

	public onCancelButtonClick(event: Event): void {
		this.game.cancelMove();
		this.hideControls = true;
		event.preventDefault();
	}

	public onChampionClick(event: Event): void {
		if (this.game.getQueuedMove() && this.styles.isActive) {
			this.game.registerChampionClick(this.champData.uid);
		} else if (this.game.getQueuedMove && this.styles.isSource) {
			this.toggleControls();
		} else if (!this.game.getQueuedMove()) {
			this.toggleControls();
		}
		event.stopPropagation();
	}
}
