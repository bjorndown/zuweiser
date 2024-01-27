import React, { FunctionComponent, useState } from 'react'
import { ParticipantsConfig } from '../core/model'
import range from 'lodash/range'
import _range from 'lodash/range'
import { MatchResult } from '../core/matcher'
import classNames from 'classnames'

type Props = {
    result: MatchResult
    participantsConfig: ParticipantsConfig
}
export const UnassignableParticipants: FunctionComponent<Props> = ({
    result,
    participantsConfig
}: Props) => {
    const [showAllParticipants, setShowAllParticipants] = useState(false)

    return (
        <div className="container">
            <h3>
                {showAllParticipants
                    ? 'Alle Teilnehmer'
                    : 'Teilnehmer mit zu wenig Aktivitäten'}
            </h3>
            <label htmlFor="showAllParticipants">Alle Teilnehmer zeigen</label>
            <input
                id="showAllParticipants"
                type="checkbox"
                checked={showAllParticipants}
                onChange={(event) =>
                    setShowAllParticipants(!showAllParticipants)
                }
            />
            <div className="fixed-header-scroll-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            {participantsConfig.otherAttributesColumns.map(
                                (attribute) => (
                                    <th>{attribute}</th>
                                )
                            )}
                            {range(
                                0,
                                participantsConfig.prioritiesPerPerson
                            ).map((priority) => (
                                <th key={priority}>Priorität {priority + 1}</th>
                            ))}
                            {_range(
                                0,
                                participantsConfig.activitiesPerPerson
                            ).map((index) => (
                                <th>Kurs {index + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {result.participants
                            .filter((participant) =>
                                showAllParticipants
                                    ? true
                                    : participant.needsMoreActivities()
                            )
                            .sort((a, b) => {
                                return a.activities.length - b.activities.length
                            })
                            .map((participant, index) => (
                                <tr
                                    key={`participant-${participant.id}-${index}`}
                                >
                                    <td>{participant.id}</td>
                                    {participant.otherAttributes.map(
                                        (attribute, i) => (
                                            <td key={`property-${i}`}>
                                                {attribute}
                                            </td>
                                        )
                                    )}
                                    {participant.priorities.map(
                                        (activityId) => {
                                            const assignableActivity =
                                                result.activities.find(
                                                    (activity) =>
                                                        activity.id ===
                                                        activityId
                                                )
                                            const assignedTo =
                                                participant.activities.find(
                                                    (value) =>
                                                        value.activity.id ===
                                                        assignableActivity.id
                                                )
                                            return (
                                                <td
                                                    key={activityId}
                                                    className={classNames({
                                                        assigned: !!assignedTo
                                                    })}
                                                >
                                                    <>
                                                        {!!assignedTo
                                                            ? `${assignableActivity.title} (${assignedTo.execution})`
                                                            : assignableActivity.title}
                                                    </>
                                                </td>
                                            )
                                        }
                                    )}
                                    {_range(
                                        0,
                                        participantsConfig.activitiesPerPerson
                                    ).map((index) => {
                                        const activity =
                                            participant.activities[index]
                                        return activity ? (
                                            <td key={index}>
                                                {`${activity.activity.title} ${activity.execution}`}
                                            </td>
                                        ) : (
                                            <td key={index} />
                                        )
                                    })}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <style jsx>{`
                .container {
                    //max-width: 800px;
                }

                .assigned {
                    font-weight: bold;
                }

                .fixed-header-scroll-container {
                    max-height: 55rem;
                    overflow: auto;
                }

                th {
                    position: sticky;
                    top: 0;
                    left: 0;
                }
            `}</style>
        </div>
    )
}
