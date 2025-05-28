type Timestamp = number;

class TokenBucket {
	private tokens: number;
	private lastRefill: Timestamp;

	constructor(
		private capacity: number,
		private refillRate: number, // tokens per ms
	) {
		this.tokens = capacity;
		this.lastRefill = Date.now();
	}

	private refill(now: Timestamp): void {
		const elapsed = now - this.lastRefill;
		const newTokens = elapsed * this.refillRate;
		this.tokens = Math.min(this.capacity, this.tokens + newTokens);
		this.lastRefill = now;
	}

	public tryRemoveToken(): boolean {
		const now = Date.now();
		this.refill(now);
		if (this.tokens >= 1) {
			this.tokens -= 1;
			return true;
		}
		return false;
	}
}
