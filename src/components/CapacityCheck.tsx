import { FunctionComponent, useMemo } from 'react'
import {ActivitiesConfig, ParticipantsConfig} from '../core/model'
import { Message } from './Message'

type Props = {
    activitiesConfig: ActivitiesConfig
    participantsConfig: ParticipantsConfig
}

export const CapacityCheck: FunctionComponent<Props> = ({
    participantsConfig,
    activitiesConfig
}) => {
    const minimumCapacity = useMemo(
        () => participantsConfig.participants.length,
        [activitiesConfig, participantsConfig]
    )
    const actualCapacity = useMemo(() => {
        return activitiesConfig.activities.reduce(
            (previousValue, currentValue) => previousValue + currentValue.limit,
            0
        )
    }, [activitiesConfig, participantsConfig])

    if (actualCapacity < minimumCapacity) {
        return (
            <Message type={'bad'}>
                Es fehlen {minimumCapacity - actualCapacity} Plätze. Im Moment
                werden {actualCapacity} Plätze angeboten. Für{' '}
                {participantsConfig.participants.length} Teilnehmer:innen, die{' '}
                {participantsConfig.activitiesPerPerson} Aktivitäten besuchen
                sollen, werden mindestens {minimumCapacity} Plätze benötigt.
            </Message>
        )
    }
    return null
}
