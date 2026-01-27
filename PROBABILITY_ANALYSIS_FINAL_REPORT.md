# Night Type MBTI Diagnostic System - Probability Distribution Analysis

## Executive Summary

I have completed a comprehensive analysis of the Night Type MBTI diagnostic system's probability distribution. The system exhibits significant mathematical bias toward "active" personality traits (A, R, T, N), with ARTN being the most common result at 11.67% probability.

## Key Findings

### 1. Systematic Bias in Question Structure

**Question Distribution:**
- Each axis (AP, RF, TE, NC) contains 6 questions
- 4 questions favor left letters (positive direction): A, R, T, N
- 2 questions favor right letters (negative direction): P, F, E, C
- Net bias: +2 toward left letters per axis

**Mathematical Impact:**
- Even neutral answers (all 0) result in ARTN due to +2 bias per axis
- Users must actively provide negative answers to achieve right letters
- The system structurally favors dominant/active personality types

### 2. Probability Rankings (Realistic Distribution)

**Top 5 Most Common Types:**
1. **ARTN** (絶対君主/冷徹女帝): **11.67%**
2. **ARTC** (暴走ダンプカー/肉食ハンター): **8.36%**
3. **PRTN** (生真面目公務員/鉄壁ガードマン): **8.33%**
4. **AREN** (過保護パトロン/過保護ママ): **8.30%**
5. **AFTN** (夜のCEO/氷の美貌): **8.28%**

**Rarest Types:**
16. **PFEC** (夢見る詩人/悲劇のヒロイン): **2.96%**
15. **PREC** (感度3000倍オス猫/とろける猫): **4.17%**
14. **AFEC** (ピーターパン/ティンカーベル): **4.18%**

### 3. Statistical Patterns

**By Letter Distribution:**
- Types with 3-4 left letters (A/R/T/N): **44.9%** combined
- Types with 3-4 right letters (P/F/E/C): **19.7%** combined
- Ratio: **2.3:1** in favor of active/dominant types

**Individual Letter Probabilities:**
- A (Active): **58.5%** vs P (Passive): **41.5%**
- R (Real): **58.5%** vs F (Fantasy): **41.5%**
- T (Tech): **58.5%** vs E (Emo): **41.5%**
- N (Normal): **58.5%** vs C (Chaos): **41.5%**

### 4. Scoring Mechanism Analysis

**How It Works:**
- User answers range from -2 (strongly disagree) to +2 (strongly agree)
- Positive direction questions: `score += user_value`
- Negative direction questions: `score -= user_value`
- Type determination: `score >= 0 ? left_letter : right_letter`

**Bias Effect:**
- Each axis has a built-in +2 bias toward left letters
- Score range per axis: -4 to +4
- Neutral behavior (all 0 answers) yields positive scores due to bias

## Complete Probability Distribution

| Rank | Type | Character Name | Probability | Left Letters |
|------|------|----------------|-------------|--------------|
| 1 | ARTN | 絶対君主/冷徹女帝 | 11.67% | 4 |
| 2 | ARTC | 暴走ダンプカー/肉食ハンター | 8.36% | 3 |
| 3 | PRTN | 生真面目公務員/鉄壁ガードマン | 8.33% | 3 |
| 4 | AREN | 過保護パトロン/過保護ママ | 8.30% | 3 |
| 5 | AFTN | 夜のCEO/氷の美貌 | 8.28% | 3 |
| 6 | AFEN | 愛の教祖/魔性の聖女 | 5.93% | 2 |
| 7 | PREN | 忠実番犬/従順秘書 | 5.91% | 2 |
| 8 | PFTN | ソロプレイヤー/冷めた脚本家 | 5.91% | 2 |
| 9 | PRTC | 無口スナイパー/無口テクニシャン | 5.89% | 2 |
| 10 | AFTC | 夜のジョーカー/小悪魔発明家 | 5.88% | 2 |
| 11 | AREC | 自意識スター/スポット女優 | 5.87% | 2 |
| 12 | PFEN | 愛の執行人/心中ロマンチスト | 4.19% | 1 |
| 13 | PFTC | 性癖研究員/変態リケジョ | 4.19% | 1 |
| 14 | AFEC | ピーターパン/ティンカーベル | 4.18% | 1 |
| 15 | PREC | 感度3000倍オス猫/とろける猫 | 4.17% | 1 |
| 16 | PFEC | 夢見る詩人/悲劇のヒロイン | 2.96% | 0 |

## Answer Strategy Guide

### To Get Specific Types:

**ARTN (Most Common - 11.67%)**
- Answer mostly neutral (0) or positive (+1, +2)
- System bias will naturally push toward this type

**PFEC (Rarest - 2.96%)**
- Must answer predominantly negative (-1, -2) across all questions
- Need to overcome +2 bias on every axis
- Requires consistent disagreement with positive statements

**Balanced Types (5-6% each)**
- Mix positive and negative answers strategically
- Focus negative answers on specific axes you want to flip

## Implications for Users

### User Experience Impact:
1. **High Likelihood of Active Types**: 60%+ chance of getting dominant/active personality description
2. **Difficulty Achieving Passive Types**: Requires deliberately negative response patterns  
3. **Type Clustering**: Most users will cluster around similar active archetypes

### Design Philosophy:
The system appears intentionally designed to emphasize active sexuality traits, which aligns with the "Night Type" branding focused on assertive romantic/sexual personalities.

## Recommendations for System Balance

If more balanced distribution is desired:

1. **Equal Question Distribution**: 3 positive + 3 negative per axis
2. **Adjusted Thresholds**: Require score > +1 (instead of ≥ 0) for left letters
3. **Weighted Scoring**: Give different importance to different questions
4. **Neutral Option**: Add true neutral type for balanced scores

## Technical Details

**Analysis Method:**
- Monte Carlo simulation with 1,000,000 samples
- Realistic distribution: 0=40%, ±1=25% each, ±2=5% each
- Based on actual question structure from `/src/data/questions.ts`
- Scoring logic from `/src/lib/scoring.ts`

**Files Analyzed:**
- `/Users/toshimitsukotarou/Desktop/adult　MBTI/src/lib/scoring.ts`
- `/Users/toshimitsukotarou/Desktop/adult　MBTI/src/data/questions.ts`
- `/Users/toshimitsukotarou/Desktop/adult　MBTI/src/lib/characterMapping.ts`

## Conclusion

The Night Type MBTI system has a mathematically provable bias toward active personality traits (A, R, T, N). This results in ARTN being 4x more likely than PFEC, and most users receiving dominant/assertive personality classifications.

While this may reflect the intended design philosophy of emphasizing active sexuality traits, users should understand that the diagnostic system is not statistically neutral and has built-in preferences toward certain personality archetypes.

---

*Analysis completed using Monte Carlo simulation and comprehensive statistical modeling of the diagnostic algorithm.*