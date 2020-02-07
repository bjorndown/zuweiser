import { NotExistError, NotUniqueError, Student } from '../core/index'

// TODO translate

export function translateException(exception) {
    if (exception instanceof NotExistError) {
        return `Teilnehmer '${exception.referrer}' verweist auf nicht-existierende Aktivität mit id='${exception.id}'`
    } else if (exception instanceof NotUniqueError) {
        switch (exception.propertyName) {
            case 'priorities':
                return `Prioritäten von '${exception.entity.toString()}' sind nicht eindeutig.`
            case 'id':
                return `IDs der ${translateEntityTypes(
                    exception.entity
                )} sind nicht eindeutig.`
            default:
                break
        }
    }

    return `Keine Übersetzung für Fehler: ${exception}`
}

function translateEntityTypes(entityType) {
    return entityType instanceof Student ? 'Teilnehmer' : 'Aktivitäten'
}
