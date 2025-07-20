import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PullsService {
  private areMocksAvailable = true;
  constructor(private http: HttpClient) {}
  getLatestPulls() {
    const url = '/zzzapiwithoutcors/api/v1/social/profile/1300000579'; // Es un UID de test, aandriu deberia hacerlo publico para poder visualizarlo

    return this.areMocksAvailable ? of(getLatestPullsMock) : this.http.get(url);
  }
}

export const getLatestPullsMock = {
  uid: 1300000579,
  apiVer: 1,
  nickname: 'esqpur',
  avatar: 'https://act-webstatic.hoyoverse.com/darkmatter/nap/prod_gf_cn/item_icon_ud1fhc/5e5e0567e358cd55e06e9eca325cc1cb.png',
  collated: {
    gacha: {
      stats: {
        '0': {
          count_s: 372,
          count_a: 3496,
          count_b: 18341,
          pity_s: 0,
          pity_a: 0,
          s_challenge_count: 0,
          s_challenge_win: 0,
          s_challenge_win_streak: 0,
          s_challenge_lose_streak: 0,
          avg_pity_s: 59.451614,
          avg_pity_a: 5.9047484,
          recent_s: [
            {
              id: 14141,
              pity: 67,
            },
            {
              id: 14141,
              pity: 71,
            },
            {
              id: 14141,
              pity: 4,
            },
            {
              id: 14121,
              pity: 70,
            },
            {
              id: 14141,
              pity: 68,
            },
            {
              id: 14141,
              pity: 74,
            },
            {
              id: 1411,
              pity: 1,
            },
            {
              id: 1141,
              pity: 56,
            },
            {
              id: 1411,
              pity: 45,
            },
            {
              id: 1141,
              pity: 13,
            },
            {
              id: 1411,
              pity: 77,
            },
            {
              id: 1411,
              pity: 78,
            },
            {
              id: 1021,
              pity: 76,
            },
            {
              id: 1411,
              pity: 76,
            },
            {
              id: 1411,
              pity: 78,
            },
            {
              id: 1411,
              pity: 77,
            },
            {
              id: 1211,
              pity: 80,
            },
            {
              id: 1101,
              pity: 79,
            },
            {
              id: 54006,
              pity: 68,
            },
            {
              id: 14107,
              pity: 66,
            },
            {
              id: 14139,
              pity: 3,
            },
            {
              id: 14139,
              pity: 6,
            },
            {
              id: 14139,
              pity: 67,
            },
            {
              id: 14110,
              pity: 68,
            },
            {
              id: 14139,
              pity: 72,
            },
            {
              id: 14139,
              pity: 65,
            },
            {
              id: 1391,
              pity: 74,
            },
            {
              id: 1391,
              pity: 76,
            },
            {
              id: 1141,
              pity: 83,
            },
            {
              id: 1391,
              pity: 82,
            },
          ],
        },
        //Estos son los ultimos pulls BANNER PERMANENTE de pj (en el apartado recent_s)
        '1001': {
          count_s: 19,
          count_a: 170,
          count_b: 955,
          pity_s: 13,
          pity_a: 3,
          s_challenge_count: 0,
          s_challenge_win: 0,
          s_challenge_win_streak: 0,
          s_challenge_lose_streak: 0,
          avg_pity_s: 59.526318,
          avg_pity_a: 6.329412,
          recent_s: [
            {
              id: 1101,
              pity: 79,
            },
            {
              id: 1181,
              pity: 78,
            },
            {
              id: 1211,
              pity: 27,
            },
            {
              id: 14118,
              pity: 15,
            },
            {
              id: 14121,
              pity: 78,
            },
            {
              id: 1141,
              pity: 79,
            },
            {
              id: 14104,
              pity: 77,
            },
            {
              id: 14114,
              pity: 3,
            },
            {
              id: 1181,
              pity: 45,
            },
            {
              id: 14104,
              pity: 49,
            },
            {
              id: 14114,
              pity: 78,
            },
            {
              id: 1021,
              pity: 62,
            },
            {
              id: 14110,
              pity: 34,
            },
            {
              id: 14121,
              pity: 67,
            },
            {
              id: 1181,
              pity: 78,
            },
            {
              id: 14114,
              pity: 76,
            },
            {
              id: 1021,
              pity: 76,
            },
            {
              id: 14102,
              pity: 80,
            },
            {
              id: 1141,
              pity: 50,
            },
          ],
        },
        //Estos son los ultimos pulls BANNER PROMOCIONAL de pj (en el apartado recent_s)
        '2001': {
          count_s: 210,
          count_a: 1913,
          count_b: 11136,
          pity_s: 3, // Indica el pity actual del banner Permanente
          pity_a: 3,
          s_challenge_count: 130,
          s_challenge_win: 50,
          s_challenge_win_streak: 4,
          s_challenge_lose_streak: 8,
          avg_pity_s: 63.12381,
          avg_pity_a: 6.4432826,
          recent_s: [
            {
              id: 1411,
              pity: 1,
            },
            {
              id: 1141,
              pity: 56,
            },
            {
              id: 1411,
              pity: 45,
            },
            {
              id: 1141,
              pity: 13,
            },
            {
              id: 1411,
              pity: 77,
            },
            {
              id: 1411,
              pity: 78,
            },
            {
              id: 1021,
              pity: 76,
            },
            {
              id: 1411,
              pity: 76,
            },
            {
              id: 1411,
              pity: 78,
            },
            {
              id: 1411,
              pity: 77,
            },
            {
              id: 1211,
              pity: 80,
            },
            {
              id: 1391,
              pity: 74,
            },
            {
              id: 1391,
              pity: 76,
            },
            {
              id: 1141,
              pity: 83,
            },
            {
              id: 1391,
              pity: 82,
            },
            {
              id: 1391,
              pity: 78,
            },
            {
              id: 1101,
              pity: 78,
            },
            {
              id: 1391,
              pity: 32,
            },
            {
              id: 1391,
              pity: 71,
            },
            {
              id: 1021,
              pity: 22,
            },
            {
              id: 1391,
              pity: 74,
            },
            {
              id: 1141,
              pity: 77,
            },
            {
              id: 1371,
              pity: 42,
            },
            {
              id: 1371,
              pity: 76,
            },
            {
              id: 1371,
              pity: 75,
            },
            {
              id: 1141,
              pity: 52,
            },
            {
              id: 1371,
              pity: 74,
            },
            {
              id: 1041,
              pity: 77,
            },
            {
              id: 1371,
              pity: 79,
            },
            {
              id: 1371,
              pity: 53,
            },
          ],
        },
        //Estos son los ultimos pulls BANNER PROMOCIONAL de armas (en el apartado recent_s)
        '3001': {
          count_s: 123,
          count_a: 1194,
          count_b: 5330,
          pity_s: 9, // Indica el pity actual del banner Permanente
          pity_a: 2,
          s_challenge_count: 93,
          s_challenge_win: 63,
          s_challenge_win_streak: 11,
          s_challenge_lose_streak: 5,
          avg_pity_s: 53.96748,
          avg_pity_a: 5.160804,
          recent_s: [
            {
              id: 14141,
              pity: 67,
            },
            {
              id: 14141,
              pity: 71,
            },
            {
              id: 14141,
              pity: 4,
            },
            {
              id: 14121,
              pity: 70,
            },
            {
              id: 14141,
              pity: 68,
            },
            {
              id: 14141,
              pity: 74,
            },
            {
              id: 14107,
              pity: 66,
            },
            {
              id: 14139,
              pity: 3,
            },
            {
              id: 14139,
              pity: 6,
            },
            {
              id: 14139,
              pity: 67,
            },
            {
              id: 14110,
              pity: 68,
            },
            {
              id: 14139,
              pity: 72,
            },
            {
              id: 14139,
              pity: 65,
            },
            {
              id: 14137,
              pity: 66,
            },
            {
              id: 14137,
              pity: 71,
            },
            {
              id: 14137,
              pity: 67,
            },
            {
              id: 14110,
              pity: 2,
            },
            {
              id: 14137,
              pity: 62,
            },
            {
              id: 14102,
              pity: 70,
            },
            {
              id: 14137,
              pity: 70,
            },
            {
              id: 14129,
              pity: 67,
            },
            {
              id: 14129,
              pity: 71,
            },
            {
              id: 14129,
              pity: 68,
            },
            {
              id: 14129,
              pity: 69,
            },
            {
              id: 14129,
              pity: 66,
            },
            {
              id: 14133,
              pity: 68,
            },
            {
              id: 14110,
              pity: 17,
            },
            {
              id: 14133,
              pity: 69,
            },
            {
              id: 14133,
              pity: 71,
            },
            {
              id: 14133,
              pity: 69,
            },
          ],
        },
        //Estos son los ultimos pulls BANNER PROMOCIONAL de Bamboos (en el apartado recent_s)
        '5001': {
          count_s: 20,
          count_a: 219,
          count_b: 920,
          pity_s: 68,
          pity_a: 8,
          s_challenge_count: 0,
          s_challenge_win: 0,
          s_challenge_win_streak: 0,
          s_challenge_lose_streak: 0,
          avg_pity_s: 54.55,
          avg_pity_a: 4.9269404,
          recent_s: [
            {
              id: 54006,
              pity: 68,
            },
            {
              id: 54017,
              pity: 72,
            },
            {
              id: 54016,
              pity: 72,
            },
            {
              id: 54015,
              pity: 3,
            },
            {
              id: 54015,
              pity: 59,
            },
            {
              id: 54015,
              pity: 69,
            },
            {
              id: 54015,
              pity: 68,
            },
            {
              id: 54002,
              pity: 8,
            },
            {
              id: 54015,
              pity: 70,
            },
            {
              id: 54005,
              pity: 66,
            },
            {
              id: 54014,
              pity: 67,
            },
            {
              id: 54006,
              pity: 71,
            },
            {
              id: 54008,
              pity: 5,
            },
            {
              id: 54013,
              pity: 23,
            },
            {
              id: 54011,
              pity: 60,
            },
            {
              id: 54012,
              pity: 67,
            },
            {
              id: 54001,
              pity: 69,
            },
            {
              id: 54009,
              pity: 51,
            },
            {
              id: 54009,
              pity: 57,
            },
            {
              id: 54004,
              pity: 66,
            },
          ],
        },
      },
    },
    achievements: {
      normal_gold: 0,
      normal_silver: 0,
      normal_bronze: 0,
      arcade_gold: 0,
      arcade_silver: 0,
      arcade_bronze: 0,
      mewmew: 0,
    },
  },
  query_time: 1753037606,
  achievement_config: {
    normal_gold: 59,
    normal_silver: 60,
    normal_bronze: 432,
    arcade_gold: 59,
    arcade_silver: 30,
    arcade_bronze: 64,
    mewmew: 136,
  },
};
