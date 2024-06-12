import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";

import ENTITY_RISK_LEVEL from "@salesforce/schema/Meta_Human_Team__c.EV_Entity_Risk_Level__c";

const fields = [ENTITY_RISK_LEVEL];

export default class EntityRiskLevel extends LightningElement {
    @api recordId;
    entityRiskLevel = '';
    riskLevelColor = '';    

    setRiskLevelColor() {
        const riskColors = {
            'Green': 'green',
            'Yellow': 'yellow',
            'Red': 'red',
            'Black': 'black'
        };

        this.riskLevelColor = riskColors[this.entityRiskLevel] || 'none';
    }
    

    @wire(getRecord, { recordId: '$recordId', fields })
    wiredRecord({ error, data }) {
        if (data) {
            this.entityRiskLevel = getFieldValue(data, ENTITY_RISK_LEVEL);
            this.setRiskLevelColor();
        } else if (error) {
            // Handle error if necessary
            console.error('Error fetching record:', error);
        }
    }

    get riskColorText() {
        if (this.riskLevelColor === 'none') {
            return 'Entity Risk Not Identified';
        }
        return this.riskLevelColor.toUpperCase();
    }

    get riskClassName() {
        return 'badge badge-' + this.riskLevelColor;
    }

    get entityRiskLevel() {
        return this.entityRiskLevel;
    }
}