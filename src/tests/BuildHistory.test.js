import React        from 'react/addons';
const { TestUtils } = React.addons;
import { expect }   from 'chai';
import sinon        from 'sinon';
import mockery      from 'mockery';


var BuildHistory;
var buildHistory;


const sampleBuilds = [
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

describe('Travis — BuildHistory', () => {

    let sandbox;

    before(() => {
        mockery.enable({ useCleanCache: true });
        mockery.warnOnUnregistered(false);
        mockery.registerMock('mozaik/browser', {
            Mixin: { ApiConsumer: {} }
        });

        BuildHistory = require('./../components/BuildHistory.jsx');
    });

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        buildHistory = TestUtils.renderIntoDocument(<BuildHistory owner="plouc" repository="mozaik" />);
    });

    afterEach(() => {
        sandbox.restore();
    });

    after(() => {
        mockery.deregisterMock('mozaik/browser');
        mockery.disable();
    });


    it('should return correct api request', () => {
        expect(buildHistory.getApiRequest()).to.eql({
            id:     'travis.buildHistory.plouc.mozaik',
            params: {
                owner:      'plouc',
                repository: 'mozaik'
            }
        });
    });


    it('should display repository slug in header', () => {
        let header = TestUtils.findRenderedDOMComponentWithClass(buildHistory, 'widget__header');
        expect(header.getDOMNode().textContent).to.equal('plouc/mozaik build history');
    });


    it('should display builds info', () => {
        buildHistory.setState({
            builds: sampleBuilds
        });

        let builds = TestUtils.scryRenderedDOMComponentsWithClass(buildHistory, 'list__item');

        expect(builds.length).to.equal(3);

        sampleBuilds.forEach((build, i) => {
            expect(builds[i].getDOMNode().textContent).to.contain(`#${ build.number } ${ build.commit.message }`);
        });
    });
});
