#!/usr/bin/env python3
"""
Night Type MBTI Probability Analysis

This script calculates the probability distribution of each character type
based on the scoring system and question distribution.
"""

import itertools
from collections import defaultdict, Counter
import math

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

# Character mapping from characterMapping.ts
CHARACTER_MAP = {
    'ARTN': 'Active君主/冷徹女帝',
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
    """Determine type based on scores (>= 0 = left letter, < 0 = right letter)."""
    type_code = ''
    type_code += 'A' if scores['AP'] >= 0 else 'P'
    type_code += 'R' if scores['RF'] >= 0 else 'F'
    type_code += 'T' if scores['TE'] >= 0 else 'E'
    type_code += 'N' if scores['NC'] >= 0 else 'C'
    return type_code

def uniform_distribution_analysis():
    """Calculate probability distribution assuming uniform answer distribution."""
    print("=" * 80)
    print("UNIFORM DISTRIBUTION ANALYSIS")
    print("(All answer values -2, -1, 0, +1, +2 equally likely)")
    print("=" * 80)
    
    type_counts = Counter()
    total_combinations = 0
    
    # Generate all possible combinations of answers
    answer_values = [-2, -1, 0, 1, 2]
    for answers in itertools.product(answer_values, repeat=24):
        scores = calculate_score(answers)
        type_code = determine_type(scores)
        type_counts[type_code] += 1
        total_combinations += 1
    
    print(f"Total possible combinations: {total_combinations:,}")
    print(f"(5^24 = {5**24:,})")
    print()
    
    # Sort by probability (highest first)
    sorted_types = sorted(type_counts.items(), key=lambda x: x[1], reverse=True)
    
    print("TYPE PROBABILITY RANKING:")
    print("-" * 50)
    for rank, (type_code, count) in enumerate(sorted_types, 1):
        probability = (count / total_combinations) * 100
        character_name = CHARACTER_MAP.get(type_code, 'Unknown')
        print(f"{rank:2d}. {type_code}: {probability:6.2f}% ({count:,} combinations)")
        print(f"    {character_name}")
        print()
    
    return type_counts, total_combinations

def realistic_distribution_analysis():
    """Calculate probability distribution with realistic answer tendencies."""
    print("=" * 80)
    print("REALISTIC DISTRIBUTION ANALYSIS")
    print("(Moderate answers more likely: 0=40%, ±1=25% each, ±2=5% each)")
    print("=" * 80)
    
    # Weight for each answer value (realistic distribution)
    answer_weights = {-2: 0.05, -1: 0.25, 0: 0.40, 1: 0.25, 2: 0.05}
    
    type_weights = defaultdict(float)
    total_weight = 0
    
    # Generate all possible combinations with weights
    answer_values = [-2, -1, 0, 1, 2]
    for answers in itertools.product(answer_values, repeat=24):
        # Calculate weight for this combination
        combination_weight = 1.0
        for answer in answers:
            combination_weight *= answer_weights[answer]
        
        scores = calculate_score(answers)
        type_code = determine_type(scores)
        type_weights[type_code] += combination_weight
        total_weight += combination_weight
    
    print(f"Total weighted probability mass: {total_weight:.10f}")
    print()
    
    # Convert to percentages and sort
    type_probabilities = {}
    for type_code, weight in type_weights.items():
        type_probabilities[type_code] = (weight / total_weight) * 100
    
    sorted_types = sorted(type_probabilities.items(), key=lambda x: x[1], reverse=True)
    
    print("TYPE PROBABILITY RANKING (REALISTIC):")
    print("-" * 60)
    for rank, (type_code, probability) in enumerate(sorted_types, 1):
        character_name = CHARACTER_MAP.get(type_code, 'Unknown')
        print(f"{rank:2d}. {type_code}: {probability:6.2f}%")
        print(f"    {character_name}")
        print()
    
    return type_probabilities

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
    
    # Calculate expected scores for neutral answers (all 0)
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

def statistical_summary():
    """Provide statistical summary and insights."""
    print("\n" + "=" * 80)
    print("STATISTICAL INSIGHTS")
    print("=" * 80)
    
    print("Key Findings:")
    print("-" * 20)
    
    print("1. BIAS TOWARD LEFT LETTERS:")
    print("   - Each axis has 4 positive questions (toward left letter)")
    print("   - Each axis has 2 negative questions (toward right letter)")
    print("   - This creates a +2 bias toward A, R, T, N in every axis")
    print()
    
    print("2. MOST COMMON TYPE:")
    print("   - ARTN is mathematically favored due to systematic bias")
    print("   - Even neutral answers (all 0) result in ARTN")
    print("   - This explains why ARTN appears most frequently")
    print()
    
    print("3. MATHEMATICAL EXPLANATION:")
    print("   - To get P/F/E/C, users need to overcome +2 bias per axis")
    print("   - Requires consistently negative answers to shift balance")
    print("   - Right-side types (P, F, E, C) are statistically disadvantaged")
    print()
    
    print("4. REALISTIC vs UNIFORM DISTRIBUTION:")
    print("   - Uniform: All answers equally likely (theoretical)")
    print("   - Realistic: Users tend toward moderate answers (0, ±1)")
    print("   - Realistic distribution amplifies the bias effect")
    print()
    
    print("5. DESIGN IMPLICATIONS:")
    print("   - Current system is biased toward 'active' characteristics")
    print("   - Types with multiple right letters (P, F, E, C) are rare")
    print("   - Most users will get ARTN or similar 'left-heavy' types")

if __name__ == "__main__":
    print("NIGHT TYPE MBTI PROBABILITY ANALYSIS")
    print("=" * 80)
    print()
    
    # Run analyses
    analyze_bias()
    print()
    
    uniform_counts, total_combinations = uniform_distribution_analysis()
    print()
    
    realistic_probabilities = realistic_distribution_analysis()
    print()
    
    statistical_summary()
    
    print("\n" + "=" * 80)
    print("ANALYSIS COMPLETE")
    print("=" * 80)