import axios from "axios";
import Cookies from "js-cookie";
import { IDashboardOverview } from "../models/dashboard.model";

export const getCities = async (placeName: string) => {
  const { data } = await axios.get(
    "https://world-geo-data.p.rapidapi.com/countries/Bangladesh",
    {
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_CITIES_API_KEY,
        "X-RapidAPI-Host": "world-geo-data.p.rapidapi.com",
      },
    }
  );
};

export const useGetDashboardOverviewData = () => {
  const userInfo = Cookies.get("user") && JSON.parse(Cookies.get("user")!);
  const triggerApi = (query: IDashboardOverviewQueryParams) =>
    axios.get<IDashboardOverview>(
      `${process.env.NEXT_PUBLIC_REST_API_URL}/dashboard/overview`,
      {
        params: query,
        headers: {
          Authorization: `Bearer ${userInfo?.accessToken}`,
        },
      }
    );

  return { triggerApi };
};

export interface IDashboardOverviewQueryParams {
  firstDate: string;
  lastDate: string;
}
