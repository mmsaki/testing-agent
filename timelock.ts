type UnixTimestamp = number;

export class TimelockVault {
  private lockedUntil: UnixTimestamp;
  private amount: number;

  constructor(lockUntil: UnixTimestamp, amount: number) {
    if (lockUntil <= Date.now()) {
      throw new Error("Lock time must be in the future");
    }
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }
    this.lockedUntil = lockUntil;
    this.amount = amount;
  }

  /**
   * Returns the amount if the vault is unlocked, else throws.
   */
  withdraw(now: UnixTimestamp): number {
    if (now < this.lockedUntil) {
      throw new Error("Funds are still locked");
    }
    const amt = this.amount;
    this.amount = 0; // burn it (optional)
    return amt;
  }

  isLocked(now: UnixTimestamp): boolean {
    return now < this.lockedUntil;
  }

  getBalance(): number {
    return this.amount;
  }
}
