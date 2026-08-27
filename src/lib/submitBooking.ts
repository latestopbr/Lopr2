import type { BookingPayload } from '@/types/estimator'
import { generateReferenceId } from '@/lib/referenceId'

export interface SubmitBookingResult {
  referenceId: string
}

/**
 * Single integration seam for the kickoff-call form. No backend exists yet,
 * so this simulates a network round-trip and logs the payload. To wire up a
 * real destination later (Formspree, EmailJS, a serverless function), replace
 * the body below with a `fetch(endpoint, { method: 'POST', body: JSON.stringify(payload) })`
 * call — the function signature and payload shape are already what a real
 * submission would send.
 */
export async function submitBooking(payload: BookingPayload): Promise<SubmitBookingResult> {
  console.info('[MOCK SUBMISSION] Kickoff call booking payload:', payload)

  await new Promise((resolve) => setTimeout(resolve, 900))

  return { referenceId: generateReferenceId() }
}
