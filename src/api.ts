import { config } from './config';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface RegistrationData {
    name: string;
    phone: string;
    package: string;
    jerseySize?: string;
    jerseyName?: string;
    jerseyNumber?: string;
    paymentMethod: string;
    transactionId: string;
    lastTwoDigit: string;
    amount: number;
}

export interface StatsResponse {
    total_students: number;
    total_money: number;
}

export interface SubmitResponse {
    success: boolean;
    data?: StatsResponse;
    message?: string;
    error?: string;
}

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Submit registration to Google Sheets
 * Uses 'text/plain' payload to avoid CORS Preflight checks.
 */
export async function submitRegistration(data: RegistrationData): Promise<SubmitResponse> {
    const url = config.googleScriptUrl;

    if (!url) {
        console.warn('Google Script URL not configured.');
    }

    try {
        // Use URLSearchParams to send as application/x-www-form-urlencoded
        // This is the most reliable way to populate e.parameter in Google Apps Script
        const formData = new URLSearchParams();
        formData.append("name", data.name);
        formData.append("phone", data.phone);
        formData.append("package", data.package);
        formData.append("jerseySize", data.jerseySize || "");
        formData.append("jerseyName", data.jerseyName || "");
        formData.append("jerseyNumber", data.jerseyNumber || "");
        formData.append("paymentMethod", data.paymentMethod);
        formData.append("transactionId", data.transactionId);
        formData.append("lastTwoDigit", data.lastTwoDigit);
        formData.append("amount", data.amount.toString());

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            // URLSearchParams automatically sets Content-Type to application/x-www-form-urlencoded
        });

        const result = await response.json();
        return result;

    } catch (error) {
        console.error('API Error:', error);
        return {
            success: false,
            error: 'Failed to connect. Check internet or ad-blockers.'
        };
    }
}

/**
 * Fetch live statistics from Google Sheets
 */
export async function fetchStats(): Promise<StatsResponse> {
    const url = config.googleScriptUrl;

    if (!url) return { total_students: 0, total_money: 0 };

    try {
        const response = await fetch(`${url}?action=getStats&t=${new Date().getTime()}`);
        const data = await response.json();

        // Handle both direct stats object and wrapped response
        if (data.total_students !== undefined) {
            return data;
        } else if (data.data?.total_students !== undefined) {
            return data.data;
        }

        return { total_students: 0, total_money: 0 };
    } catch (error) {
        console.error('Stats Fetch Error:', error);
        return { total_students: 0, total_money: 0 };
    }
}
