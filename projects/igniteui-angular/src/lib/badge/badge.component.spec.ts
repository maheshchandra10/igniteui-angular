import { Component, ViewChild } from '@angular/core';
import {
    async,
    TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IgxIconModule } from '../icon/public_api';
import { IgxBadgeComponent, IgxBadgeType } from './badge.component';

import { configureTestSuite } from '../test-utils/configure-suite';

describe('Badge', () => {
    configureTestSuite();
    beforeAll(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                InitBadgeComponent,
                InitBadgeWithDefaultsComponent,
                InitBadgeWithIconComponent,
                IgxBadgeComponent,
                InitBadgeWithIconARIAComponent
            ],
            imports: [IgxIconModule]
        }).compileComponents();
    }));

    it('Initializes badge ', () => {
        const fixture = TestBed.createComponent(InitBadgeComponent);
        fixture.detectChanges();
        const badge = fixture.componentInstance.badge;

        expect(badge.value).toBeTruthy();
        expect(badge.type).toBeTruthy();

        expect(fixture.debugElement.query(By.css('.igx-badge'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('.igx-badge--error'))).toBeTruthy();

        expect(badge.value).toMatch('22');
        expect(badge.type).toMatch('error');
    });

    it('Initializes badge with id', () => {
        const fixture = TestBed.createComponent(InitBadgeComponent);
        fixture.detectChanges();
        const badge = fixture.componentInstance.badge;
        const domBadge = fixture.debugElement.query(By.css('igx-badge')).nativeElement;

        expect(badge.id).toContain('igx-badge-');
        expect(domBadge.id).toContain('igx-badge-');

        badge.id = 'customBadge';
        fixture.detectChanges();

        expect(badge.id).toBe('customBadge');
        expect(domBadge.id).toBe('customBadge');
    });

    it('Initializes badge defaults', () => {
        const fixture = TestBed.createComponent(InitBadgeWithDefaultsComponent);
        fixture.detectChanges();
        const badge = fixture.componentInstance.badge;

        expect(badge.value).toMatch('');
        expect(badge.icon).toBeFalsy();

        expect(fixture.debugElement.query(By.css('.igx-badge'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('.igx-badge--icon'))).toBeFalsy();
    });

    it('Initializes badge with icon', () => {
        const fixture = TestBed.createComponent(InitBadgeWithIconComponent);
        fixture.detectChanges();
        const badge = fixture.componentInstance.badge;

        expect(badge.icon === 'person').toBeTruthy();
        expect(badge.type === IgxBadgeType.INFO).toBeTruthy();
        expect(badge.value === '').toBeTruthy();

        expect(fixture.debugElement.query(By.css('.igx-badge'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('.igx-badge--info'))).toBeTruthy();
    });

    it('Initializes badge with icon ARIA', () => {
        const fixture = TestBed.createComponent(InitBadgeWithIconARIAComponent);
        fixture.detectChanges();
        const badge = fixture.componentInstance.badge;

        const expectedDescription = `${badge.type} type badge with icon type ${badge.icon}`;
        expect(badge.roleDescription).toMatch(expectedDescription);

        const container = fixture.nativeElement.querySelectorAll('.igx-badge')[0];
        expect(container.getAttribute('aria-roledescription')).toMatch(expectedDescription);
    });
});

@Component({ template: `<igx-badge type="error" value="22"></igx-badge>` })
class InitBadgeComponent {
    @ViewChild(IgxBadgeComponent, { static: true }) public badge: IgxBadgeComponent;
}

@Component({ template: `<igx-badge></igx-badge>` })
class InitBadgeWithDefaultsComponent {
    @ViewChild(IgxBadgeComponent, { static: true }) public badge: IgxBadgeComponent;
}

@Component({ template: `<igx-badge icon="person" type="info"></igx-badge>` })
class InitBadgeWithIconComponent {
    @ViewChild(IgxBadgeComponent, { static: true }) public badge: IgxBadgeComponent;
}

@Component({ template: `<igx-badge icon="person"></igx-badge>` })
class InitBadgeWithIconARIAComponent {
    @ViewChild(IgxBadgeComponent, { static: true }) public badge: IgxBadgeComponent;
}
