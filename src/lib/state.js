import {
    CheckCircleIcon,
    HelpIcon,
    SlashIcon,
    AlertCircleIcon,
    AlertTriangleIcon,
    PauseCircleIcon,
    PlayCircleIcon,
} from '@mozaik/ui'

export const colorByState = (colors, state) => {
    if (state === 'received' || state === 'created' || state === 'started') {
        return colors.warning
    }

    if (state === 'errored' || state === 'failed') {
        return colors.failure
    }

    if (state === 'passed') {
        return colors.success
    }

    return colors.unknown
}

export const iconByState = state => {
    if (state === 'received' || state === 'created') {
        return PauseCircleIcon
    }

    if (state === 'started') {
        return PlayCircleIcon
    }

    if (state === 'passed') {
        return CheckCircleIcon
    }

    if (state === 'errored') {
        return AlertTriangleIcon
    }

    if (state === 'failed') {
        return AlertCircleIcon
    }

    if (state === 'canceled') {
        return SlashIcon
    }

    return HelpIcon
}
