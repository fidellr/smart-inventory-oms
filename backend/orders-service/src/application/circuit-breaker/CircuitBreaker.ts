type CircuitBreakerState = "CLOSED" | "OPEN" | "HALF_OPEN";

/**
 * Phase:
 * 1. CLOSED: Normal Operation -> [`failureThreshold`]
 * 2. OPEN: Rejects all requests for `recoveryTime` -> [`recoveryTime`]
 * 3. HALF_OPEN: Allows limited requests; if `successThreshold` successes = CLOSE -> [`successThreshold`]
 */
export class CircuitBreaker {
  private failureCount = 0;
  private successCount = 0;
  private state: CircuitBreakerState = "CLOSED";
  private nextAttempt = 0;

  constructor(
    private failureThreshold: number = 3, // number of failed requests before opening
    private recoveryTime: number = 5000, // time (ms) to stay open before half-opening
    private successThreshold: number = 2 // number of consecutive successes to close
  ) {}

  async exec<T>(action: () => Promise<T>): Promise<T> {
    // If circuit is OPEN → only allow requests after cooldown
    if (this.state === "OPEN") {
      if (Date.now() > this.nextAttempt) {
        this.state = "HALF_OPEN";
        console.log("[CircuitBreaker] Transition to HALF_OPEN");
      } else {
        throw new Error("CircuitBreaker: Currently OPEN");
      }
    }

    try {
      const result = await action();
      this.onSuccess();
      return result;
    } catch (err) {
      this.onFailure();
      throw err;
    }
  }

  private onSuccess() {
    if (this.state === "HALF_OPEN") {
      this.successCount++;
      if (this.successCount >= this.successThreshold) {
        console.log("[CircuitBreaker] Recovered → CLOSED");
        this.reset();
      }
    } else {
      this.reset(); // normal closed circuit success
    }
  }

  private onFailure() {
    this.failureCount++;
    console.warn(`[CircuitBreaker] Failure #${this.failureCount}`);
    if (this.failureCount >= this.failureThreshold) {
      this.trip();
    }
  }

  private trip() {
    this.state = "OPEN";
    this.nextAttempt = Date.now() + this.recoveryTime;
    console.error(`[CircuitBreaker] OPEN state for ${this.recoveryTime}ms`);
  }

  private reset() {
    this.failureCount = 0;
    this.successCount = 0;
    this.state = "CLOSED";
  }
}
