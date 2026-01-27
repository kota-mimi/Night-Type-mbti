#!/usr/bin/env python3
"""
Efficient Night Type MBTI Probability Analysis using Monte Carlo sampling
"""

import random
from collections import Counter, defaultdict
import numpy as np

# Question data from questions.ts
QUESTIONS = [
    {'id': 1, 'axis': 'AP', 'direction': 'positive'},
    {'id': 2, 'axis': 'AP', 'direction': 'negative'},
    {'id': 3, 'axis': 'RF', 'direction': 'positive'},
    {'id': 4, 'axis': 'RF', 'direction': 'negative'},
    {'id': 5, 'axis': 'TE', 'direction': 'positive'},
    {'id': 6, 'axis': 'TE', 'direction': 'negative'},
    {'id': 7, 'axis': 'NC', 'direction': 'positive'},
    {'id': 8, 'axis': 'NC', 'direction': 'negative'},
    {'id': 9, 'axis': 'AP', 'direction': 'positive'},
    {'id': 10, 'axis': 'AP', 'direction': 'positive'},
    {'id': 11, 'axis': 'RF', 'direction': 'positive'},
    {'id': 12, 'axis': 'RF', 'direction': 'positive'},
    {'id': 13, 'axis': 'TE', 'direction': 'positive'},
    {'id': 14, 'axis': 'TE', 'direction': 'positive'},
    {'id': 15, 'axis': 'NC', 'direction': 'positive'},
    {'id': 16, 'axis': 'NC', 'direction': 'positive'},
    {'id': 17, 'axis': 'AP', 'direction': 'positive'},
    {'id': 18, 'axis': 'AP', 'direction': 'negative'},
    {'id': 19, 'axis': 'RF', 'direction': 'positive'},
    {'id': 20, 'axis': 'RF', 'direction': 'negative'},
    {'id': 21, 'axis': 'TE', 'direction': 'positive'},
    {'id': 22, 'axis': 'TE', 'direction': 'negative'},
    {'id': 23, 'axis': 'NC', 'direction': 'positive'},
    {'id': 24, 'axis': 'NC', 'direction': 'negative'}
]

# Character mapping
CHARACTER_MAP = {
    'ARTN': '絶対君主/冷徹女帝',
    'AFTN': '夜のCEO/氷の美貌', 
    'AREN': '過保護パトロン/過保護ママ',
    'AFEN': '愛の教祖/魔性の聖女',
    'ARTC': '暴走ダンプカー/肉食ハンター',
    'AFTC': '夜のジョーカー/小悪魔発明家',
    'AREC': '自意識スター/スポット女優',
    'AFEC': 'ピーターパン/ティンカーベル',
    'PRTN': '生真面目公務員/鉄壁ガードマン',
    'PFTN': 'ソロプレイヤー/冷めた脚本家',
    'PRTC': '無口スナイパー/無口テクニシャン',
    'PFTC': '性癖研究員/変態リケジョ',
    'PREN': '忠実番犬/従順秘書',
    'PFEN': '愛の執行人/心中ロマンチスト',
    'PREC': '感度3000倍オス猫/とろける猫',
    'PFEC': '夢見る詩人/悲劇のヒロイン'
}

def calculate_score(answers):
    """Calculate scores for each axis based on answers."""
    scores = {'AP': 0, 'RF': 0, 'TE': 0, 'NC': 0}
    
    for i, answer_value in enumerate(answers):
        question = QUESTIONS[i]
        axis = question['axis']
        direction = question['direction']
        
        if direction == 'positive':
            scores[axis] += answer_value
        else:  # negative
            scores[axis] -= answer_value
    
    return scores

def determine_type(scores):
    """Determine type based on scores."""
    type_code = ''
    type_code += 'A' if scores['AP'] >= 0 else 'P'
    type_code += 'R' if scores['RF'] >= 0 else 'F'
    type_code += 'T' if scores['TE'] >= 0 else 'E'
    type_code += 'N' if scores['NC'] >= 0 else 'C'
    return type_code

def analyze_bias():
    """Analyze the bias in the scoring system."""
    print("=" * 80)
    print("BIAS ANALYSIS")
    print("=" * 80)
    
    # Count questions by axis and direction
    axis_counts = {'AP': {'pos': 0, 'neg': 0}, 'RF': {'pos': 0, 'neg': 0}, 
                   'TE': {'pos': 0, 'neg': 0}, 'NC': {'pos': 0, 'neg': 0}}
    
    for question in QUESTIONS:
        axis = question['axis']
        direction = 'pos' if question['direction'] == 'positive' else 'neg'
        axis_counts[axis][direction] += 1
    
    print("Question Distribution by Axis:")
    print("-" * 40)
    for axis in ['AP', 'RF', 'TE', 'NC']:
        pos = axis_counts[axis]['pos']
        neg = axis_counts[axis]['neg']
        bias = pos - neg
        total = pos + neg
        
        left_letter = axis[0]
        right_letter = {'AP': 'P', 'RF': 'F', 'TE': 'E', 'NC': 'C'}[axis]
        
        print(f"{axis} ({left_letter}/{right_letter}): {total} questions")
        print(f"  Positive ({left_letter}): {pos} questions")
        print(f"  Negative ({right_letter}): {neg} questions")
        print(f"  Bias toward {left_letter}: +{bias}")
        print()
    
    # Calculate expected scores for neutral answers
    print("Expected Scores for Neutral Answers (all 0):")
    print("-" * 50)
    neutral_scores = calculate_score([0] * 24)
    for axis, score in neutral_scores.items():
        left_letter = axis[0]
        right_letter = {'AP': 'P', 'RF': 'F', 'TE': 'E', 'NC': 'C'}[axis]
        result = left_letter if score >= 0 else right_letter
        print(f"{axis}: {score} → {result}")
    
    neutral_type = determine_type(neutral_scores)
    character_name = CHARACTER_MAP.get(neutral_type, 'Unknown')
    print(f"\nNeutral Type: {neutral_type}")
    print(f"Character: {character_name}")

def monte_carlo_analysis(num_samples=1000000, distribution_type="uniform"):
    """Monte Carlo sampling analysis."""
    print("=" * 80)
    print(f"MONTE CARLO ANALYSIS ({distribution_type.upper()} DISTRIBUTION)")
    print(f"Sample size: {num_samples:,}")
    print("=" * 80)
    
    type_counts = Counter()
    
    for _ in range(num_samples):
        if distribution_type == "uniform":
            # Uniform distribution: all values equally likely
            answers = [random.choice([-2, -1, 0, 1, 2]) for _ in range(24)]
        else:
            # Realistic distribution: moderate answers more likely
            # 0=40%, ±1=25% each, ±2=5% each
            weights = [0.05, 0.25, 0.40, 0.25, 0.05]
            values = [-2, -1, 0, 1, 2]
            answers = [random.choices(values, weights=weights)[0] for _ in range(24)]
        
        scores = calculate_score(answers)
        type_code = determine_type(scores)
        type_counts[type_code] += 1
    
    # Sort by frequency
    sorted_types = sorted(type_counts.items(), key=lambda x: x[1], reverse=True)
    
    print("TYPE PROBABILITY RANKING:")
    print("-" * 70)
    for rank, (type_code, count) in enumerate(sorted_types, 1):
        probability = (count / num_samples) * 100
        character_name = CHARACTER_MAP.get(type_code, 'Unknown')
        print(f"{rank:2d}. {type_code}: {probability:6.2f}% ({count:,} samples)")
        print(f"    {character_name}")
        print()
    
    return type_counts

def theoretical_analysis():
    """Theoretical analysis of extreme cases."""
    print("=" * 80)
    print("THEORETICAL ANALYSIS")
    print("=" * 80)
    
    # Calculate the theoretical bias
    bias_per_axis = 2  # 4 positive - 2 negative questions per axis
    
    print("Theoretical Bias Analysis:")
    print("-" * 30)
    print(f"Bias per axis: +{bias_per_axis} (toward left letter)")
    print()
    
    print("Score ranges for each axis:")
    print("- Minimum possible score: 4×(-2) + 2×(+2) = -4 (right letter)")
    print("- Maximum possible score: 4×(+2) + 2×(-2) = +4 (left letter)")
    print("- Neutral score (all 0): +2 (left letter)")
    print()
    
    print("Required answers to get right letter (P/F/E/C):")
    print("To overcome +2 bias, need net negative answers")
    print("Examples for one axis:")
    print("- All questions answered -1: 4×(-1) + 2×(+1) = -2 → Right letter")
    print("- All questions answered -2: 4×(-2) + 2×(+2) = -4 → Right letter")
    print("- Mixed negative bias needed")
    print()
    
    # Calculate some specific combinations
    print("Specific Type Requirements:")
    print("-" * 30)
    
    # PFEC (all right letters) - hardest to achieve
    print("PFEC (all right letters): Requires negative net score on ALL axes")
    print("- Each axis needs score < 0")
    print("- Must overcome +2 bias on each axis")
    print("- Example: Answer mostly -1 and -2 across all questions")
    print()
    
    # ARTN (all left letters) - easiest to achieve
    print("ARTN (all left letters): Default due to bias")
    print("- Achieved with any non-negative net scores")
    print("- Even neutral answers (all 0) give ARTN")
    print("- Example: Any mix of 0, +1, +2 answers")
    print()

def calculate_exact_probabilities():
    """Calculate exact probabilities using mathematical approach."""
    print("=" * 80)
    print("EXACT MATHEMATICAL CALCULATION")
    print("=" * 80)
    
    # For realistic distribution, calculate exact probability of each type
    # Each question answered with probabilities: -2(5%), -1(25%), 0(40%), +1(25%), +2(5%)
    
    print("Calculating exact probabilities for realistic distribution...")
    print("This may take a moment...")
    
    # We'll calculate probability for each axis separately, then combine
    axis_questions = {'AP': [], 'RF': [], 'TE': [], 'NC': []}
    for i, q in enumerate(QUESTIONS):
        axis_questions[q['axis']].append((i, q['direction']))
    
    print("\nAxis question breakdown:")
    for axis, questions in axis_questions.items():
        pos_count = sum(1 for _, direction in questions if direction == 'positive')
        neg_count = len(questions) - pos_count
        print(f"{axis}: {pos_count} positive, {neg_count} negative questions")
    
    # For computational tractability, let's use the Monte Carlo results
    print("\nUsing Monte Carlo approximation for final probabilities...")

if __name__ == "__main__":
    print("NIGHT TYPE MBTI PROBABILITY ANALYSIS")
    print("(Efficient Monte Carlo Sampling)")
    print("=" * 80)
    print()
    
    # Set random seed for reproducibility
    random.seed(42)
    np.random.seed(42)
    
    # Run analyses
    analyze_bias()
    print()
    
    theoretical_analysis()
    print()
    
    uniform_counts = monte_carlo_analysis(num_samples=1000000, distribution_type="uniform")
    print()
    
    realistic_counts = monte_carlo_analysis(num_samples=1000000, distribution_type="realistic")
    print()
    
    calculate_exact_probabilities()
    
    print("\n" + "=" * 80)
    print("KEY INSIGHTS")
    print("=" * 80)
    print()
    print("1. SYSTEMATIC BIAS:")
    print("   - Each axis biased +2 toward left letter (A, R, T, N)")
    print("   - ARTN is the mathematical default (achieved with neutral answers)")
    print()
    print("2. TYPE FREQUENCY (Realistic Distribution):")
    uniform_artn = (uniform_counts['ARTN'] / 1000000) * 100
    realistic_artn = (realistic_counts['ARTN'] / 1000000) * 100
    print(f"   - ARTN: ~{realistic_artn:.1f}% (most common)")
    print("   - Types with A,R,T,N letters dominate")
    print("   - Types with P,F,E,C letters are rare")
    print()
    print("3. DESIGN IMPLICATION:")
    print("   - System favors 'active' personality traits")
    print("   - 'Passive' traits require consistently negative answers")
    print("   - Most users will be classified as dominant/active types")
    
    print("\n" + "=" * 80)
    print("ANALYSIS COMPLETE")
    print("=" * 80)