import { render } from '@testing-library/angular';
import { provideMarkdown } from 'ngx-markdown';
import { CurrentTeamComponent } from './current-team.component';

describe('CurrentTeamComponent', () => {
  const providers = [provideMarkdown()];

  it('should create', async () => {
    const { fixture } = await render(CurrentTeamComponent, { providers });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display all team members initially', async () => {
    const { container } = await render(CurrentTeamComponent, { providers });
    const profileCards = container.querySelectorAll('hra-profile-card');
    expect(profileCards.length).toBe(8);
  });

  it('should display search filter component', async () => {
    const { container } = await render(CurrentTeamComponent, { providers });
    const searchFilter = container.querySelector('hra-search-filter');
    expect(searchFilter).toBeTruthy();
  });

  it('should filter team members by name', async () => {
    const { fixture } = await render(CurrentTeamComponent, { providers });
    const component = fixture.componentInstance;

    component.searchQuery.set('Katy');
    fixture.detectChanges();

    expect(component.filteredMembers().length).toBe(1);
    expect(component.filteredMembers()[0].name).toBe('Katy Börner');
  });

  it('should filter team members by title', async () => {
    const { fixture } = await render(CurrentTeamComponent, { providers });
    const component = fixture.componentInstance;

    component.searchQuery.set('Director');
    fixture.detectChanges();

    expect(component.filteredMembers().length).toBeGreaterThan(0);
  });

  it('should show no results indicator when search returns empty', async () => {
    const { fixture, container } = await render(CurrentTeamComponent, { providers });
    const component = fixture.componentInstance;

    component.searchQuery.set('NonExistentName');
    fixture.detectChanges();

    expect(component.hasNoResults()).toBe(true);
    const noResults = container.querySelector('hra-no-results-indicator');
    expect(noResults).toBeTruthy();
  });

  it('should clear filters when clearFilters is called', async () => {
    const { fixture } = await render(CurrentTeamComponent, { providers });
    const component = fixture.componentInstance;

    component.searchQuery.set('test');
    expect(component.searchQuery()).toBe('test');

    component.clearFilters();
    expect(component.searchQuery()).toBe('');
  });

  it('should return correct total count', async () => {
    const { fixture } = await render(CurrentTeamComponent, { providers });
    const component = fixture.componentInstance;

    expect(component.totalCount()).toBe(8);
  });

  it('should return correct viewing count after filter', async () => {
    const { fixture } = await render(CurrentTeamComponent, { providers });
    const component = fixture.componentInstance;

    component.searchQuery.set('Katy');
    fixture.detectChanges();

    expect(component.viewingCount()).toBe(1);
  });

  it('should return placeholder image when member has no image', async () => {
    const { fixture } = await render(CurrentTeamComponent, { providers });
    const component = fixture.componentInstance;
    const memberWithoutImage = component.teamMembers()[1]; // Andreas Bueckle has empty image

    const result = component.getProfilePicture(memberWithoutImage);
    expect(result).toBe('/assets/placeholder.png');
  });

  it('should return member image when available', async () => {
    const { fixture } = await render(CurrentTeamComponent, { providers });
    const component = fixture.componentInstance;
    const memberWithImage = component.teamMembers()[0]; // Katy Börner has image

    const result = component.getProfilePicture(memberWithImage);
    expect(result).toBe('/assets/people/katy-borner.png');
  });

  it('should generate correct profile link', async () => {
    const { fixture } = await render(CurrentTeamComponent, { providers });
    const component = fixture.componentInstance;
    const member = component.teamMembers()[0];

    const link = component.getProfileLink(member);
    expect(link).toBe('/people/katy-borner');
  });

  it('should get member title from first role', async () => {
    const { fixture } = await render(CurrentTeamComponent, { providers });
    const component = fixture.componentInstance;
    const member = component.teamMembers()[0];

    const title = component.getMemberTitle(member);
    expect(title).toBe('Faculty, Center Director');
  });
});
