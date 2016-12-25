import test           from 'ava'
import React          from 'react'
import { shallow }    from 'enzyme'
import BuildHistogram from '../../src/components/BuildHistogram'
import {
    WidgetLoader,
    WidgetHeader,
} from 'mozaik/ui'


const sampleOwner      = 'plouc'
const sampleRepository = 'mozaik'

test('should return correct api request', t => {
    t.deepEqual(
        BuildHistogram.getApiRequest({
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
        <BuildHistogram
            owner={sampleOwner}
            repository={sampleRepository}
        />,
        { context: { theme: {} } }
    )

    t.is(wrapper.find(WidgetLoader).length, 1)
})

test('should display owner/repo', t => {
    const wrapper = shallow(
        <BuildHistogram
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
        <BuildHistogram
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
