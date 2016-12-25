import test             from 'ava'
import React            from 'react'
import { shallow }      from 'enzyme'
import BuildHistory     from '../../src/components/BuildHistory'
import BuildHistoryItem from '../../src/components/BuildHistoryItem'
import {
    WidgetLoader,
    WidgetHeader,
} from 'mozaik/ui'


const sampleOwner      = 'plouc'
const sampleRepository = 'mozaik'
const sampleBuilds     = [
    {
        id: 2,
        number: '2',
        state: 'passed',
        duration: 10,
        finished_at: '2015-01-01T16:02:51Z',
        commit: {
            message: 'commit message 2'
        }
    },
    {
        id: 1,
        number: '1',
        state: 'passed',
        duration: 10,
        finished_at: '2015-01-01T16:02:51Z',
        commit: {
            message: 'commit message 1'
        }
    },
    {
        id: 0,
        number: '0',
        state: 'failed',
        duration: 10,
        finished_at: '2015-01-01T16:02:51Z',
        commit: {
            message: 'commit message 0'
        }
    }
]

test('should return correct api request', t => {
    t.deepEqual(
        BuildHistory.getApiRequest({
            owner:      sampleOwner,
            repository: sampleRepository,
        }),
        {
            id:     `travis.buildHistory.${sampleOwner}.${sampleRepository}`,
            params: {
                owner:      sampleOwner,
                repository: sampleRepository,
            },
        }
    )
})

test('should display loader if no apiData available', t => {
    const wrapper = shallow(
        <BuildHistory
            owner={sampleOwner}
            repository={sampleRepository}
        />,
        { context: { theme: {} } }
    )

    t.is(wrapper.find(WidgetLoader).length, 1)
})

test('should display owner/repo', t => {
    const wrapper = shallow(
        <BuildHistory
            owner={sampleOwner}
            repository={sampleRepository}
        />,
        { context: { theme: {} } }
    )

    const header = wrapper.find(WidgetHeader)
    t.is(header.length, 1)
    t.is(header.prop('title'), 'Builds')
    t.is(header.prop('subject'), `${sampleOwner}/${sampleRepository}`)
})

test('should allow title override', t => {
    const wrapper = shallow(
        <BuildHistory
            owner={sampleOwner}
            repository={sampleRepository}
            title="override"
        />,
        { context: { theme: {} } }
    )

    const header = wrapper.find(WidgetHeader)
    t.is(header.length, 1)
    t.is(header.prop('title'), 'override')
    t.is(header.prop('subject'), null)
})

test('should display builds info', t => {
    const wrapper = shallow(
        <BuildHistory
            owner={sampleOwner}
            repository={sampleRepository}
            apiData={{ builds: sampleBuilds }}
        />
    )

    const builds = wrapper.find(BuildHistoryItem)
    t.is(builds.length, sampleBuilds.length)
})
