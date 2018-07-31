import React from 'react'
import { shallow } from 'enzyme'
import { WidgetLoader, WidgetHeader, defaultTheme } from '@mozaik/ui'
import BuildHistogram from '../../src/components/BuildHistogram'

const owner = 'plouc'
const repository = 'mozaik'

describe('getApiRequest', () => {
    it('should return correct api request', () => {
        expect(
            BuildHistogram.getApiRequest({
                owner,
                repository,
            })
        ).toEqual({
            id: `travis.repositoryBuildHistory.${owner}.${repository}.20`,
            params: {
                owner,
                repository,
                limit: 20,
            },
        })
    })
})

it('should display loader if no apiData available', () => {
    const wrapper = shallow(
        <BuildHistogram owner={owner} repository={repository} theme={defaultTheme} />
    )

    expect(wrapper.find(WidgetLoader)).toHaveLength(1)
})

it('should display owner/repo', () => {
    const wrapper = shallow(
        <BuildHistogram owner={owner} repository={repository} theme={defaultTheme} />,
        {
            context: { theme: {} },
        }
    )

    const header = wrapper.find(WidgetHeader)
    expect(header).toHaveLength(1)
    expect(header.prop('title')).toBe('builds')
    expect(header.prop('subject')).toBe(`${owner}/${repository}`)
})

it('should allow title override', () => {
    const wrapper = shallow(
        <BuildHistogram
            owner={owner}
            repository={repository}
            title="override"
            theme={defaultTheme}
        />
    )

    const header = wrapper.find(WidgetHeader)
    expect(header).toHaveLength(1)
    expect(header.prop('title')).toBe('override')
    expect(header.prop('subject')).toBe(null)
})
