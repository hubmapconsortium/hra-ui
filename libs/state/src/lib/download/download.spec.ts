import { NgModule } from '@angular/core';
import { StateContext } from '@ngxs/store';
import { mock } from 'jest-mock-extended';
import { Shallow } from 'shallow-render';
import { Download } from './download.action';

@NgModule()
class TestModule {}

describe('DownlodState', () => {
  const testFileFormat = 'svg';

  const testAction = new Download(testFileFormat);
  const ctx = mock<StateContext<void>>();
  let shallow: Shallow<Download>;

  beforeEach(() => {
    shallow = new Shallow(Download, TestModule).provide(Download);
  });

  afterEach(() => jest.clearAllMocks());

  it('should call the contact service to send a message', async () => {
    const { instance, inject } = shallow.createService();
  });
});
