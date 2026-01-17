/**
 * Value objects for typed conversation context data
 * These represent the data collected during the conversation flow
 */

export type ServiceType = 'consultation' | 'emergency' | 'information';

export class PatientData {
    constructor(
        public readonly name?: string,
        public readonly reason?: string,
        public readonly serviceType?: ServiceType
    ) { }

    public isComplete(): boolean {
        return !!this.name && !!this.reason && !!this.serviceType;
    }

    public static fromContext(context: Map<string, any>): PatientData {
        return new PatientData(
            context.get('patientName'),
            context.get('visitReason'),
            context.get('serviceType')
        );
    }
}
