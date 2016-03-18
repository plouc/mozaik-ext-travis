import test             from 'ava';
import React            from 'react';
import { shallow }      from 'enzyme';
import mockery          from 'mockery';
import BuildHistoryItem from './../src/components/BuildHistoryItem.jsx';


let BuildHistory;
const sampleOwner      = 'plouc';
const sampleRepository = 'mozaik';
const sampleBuilds     = [
    {
        id: 2,
        number: '2',
        state: 'passed',
        finished_at: '2015-01-01T16:02:51Z',
        commit: {
            message: 'commit message 2'
        }
    },
    {
        id: 1,
        number: '1',
        state: 'passed',
        finished_at: '2015-01-01T16:02:51Z',
        commit: {
            message: 'commit message 1'
        }
    },
    {
        id: 0,
        number: '0',
        state: 'failed',
        finished_at: '2015-01-01T16:02:51Z',
        commit: {
            message: 'commit message 0'
        }
    }
];


test.before(t => {
    mockery.enable({
        warnOnUnregistered: false
    });
    mockery.registerMock('mozaik/browser', {
        Mixin: { ApiConsumer: {} }
    });

    BuildHistory = require('./../src/components/BuildHistory.jsx').default;
});


test.after(t => {
    mockery.deregisterMock('mozaik/browser');
    mockery.disable();
});


test('should return correct api request', t => {
    const wrapper = shallow(<BuildHistory owner={sampleOwner} repository={sampleRepository} />);

    t.same(wrapper.instance().getApiRequest(), {
        id:     `travis.buildHistory.${sampleOwner}.${sampleRepository}`,
        params: {
            owner:      sampleOwner,
            repository: sampleRepository
        }
    });
});


test('should display repository slug in header', t => {
    const wrapper = shallow(<BuildHistory owner={sampleOwner} repository={sampleRepository} />);

    t.is(wrapper.find('.widget__header').text(), `${sampleOwner}/${sampleRepository} build history`);
});


test('should display builds info', t => {
    const wrapper = shallow(<BuildHistory owner={sampleOwner} repository={sampleRepository} />);
    wrapper.setState({ builds: sampleBuilds });

    const builds = wrapper.find(BuildHistoryItem);
    t.is(builds.length, sampleBuilds.length);
});
