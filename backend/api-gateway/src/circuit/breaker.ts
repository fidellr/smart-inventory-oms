import axios, { AxiosRequestConfig } from "axios";
import CircuitBreaker from "opossum";

export function createBreaker(serviceName: string) {
  const opts = {
    timeout: 5000, // if request > 5s, trigger failure
    errorThresholdPercentage: 50, // 50% failure opens circuit
    resetTimeout: 10000, // after 10s, try half-open
  };

  const breaker = new CircuitBreaker(
    async (url: string, config?: AxiosRequestConfig<any>) => {
      const res = await axios(url, config);
      return res.data;
    },
    opts
  );

  // logging
  breaker.on("open", () => console.warn(`${serviceName} circuit opened`));
  breaker.on("halfOpen", () =>
    console.warn(`${serviceName} circuit half-open`)
  );
  breaker.on("close", () => console.warn(`${serviceName} circuit closed`));

  return breaker;
}
