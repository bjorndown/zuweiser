import { Statistics } from './Statistics'
import { FunctionComponent } from 'react'
import type { MatchResult } from '../core/matcher'
import { UnassignableParticipants } from './UnassignableParticipants'
import { MatchedActivity } from './MatchedActivity'
import { ParticipantsConfig } from '../core/model'

type Props = {
    result: MatchResult
    participantsConfig: ParticipantsConfig
}

export const Results: FunctionComponent<Props> = ({
    result,
    participantsConfig
}) => {
    result.participants.map((p) => {
        const pos = p.otherPossiblePriorities(result.activities)
        if (pos.length) {
            console.log('possible', p, pos)
        }
    })
    return (
        <div>
            <h2>Resultat</h2>
            <Statistics
                result={result}
                particpantsConfig={participantsConfig}
            />
            <UnassignableParticipants
                result={result}
                participantsConfig={participantsConfig}
            />

            <section>
                <h3>Zuweisungen pro Kurs</h3>
                <div className="matching-results">
                    {result.activities.map((activity) => (
                        <MatchedActivity
                            key={`activity-${activity.id}`}
                            activity={activity}
                            participantsConfig={participantsConfig}
                            result={result}
                        />
                    ))}
                </div>
            </section>

            <style jsx>{`
                .matching-results {
                    display: flex;
                    flex-flow: row wrap;
                    gap: 1rem;
                }
            `}</style>
        </div>
    )
}
