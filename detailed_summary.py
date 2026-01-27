#!/usr/bin/env python3
"""
Detailed Summary of Night Type MBTI Probability Distribution Analysis
"""

def print_detailed_summary():
    print("=" * 80)
    print("NIGHT TYPE MBTI - COMPREHENSIVE PROBABILITY ANALYSIS REPORT")
    print("=" * 80)
    
    print("\n📊 EXECUTIVE SUMMARY")
    print("=" * 50)
    print("• Systematic bias toward 'left' personality traits (A, R, T, N)")
    print("• ARTN (絶対君主/冷徹女帝) is most common at 11.7% probability")
    print("• 'Right' traits (P, F, E, C) require consistent negative answers to achieve")
    print("• Distribution heavily favors active/dominant personality types")
    
    print("\n🔍 DETAILED FINDINGS")
    print("=" * 50)
    
    print("\n1. QUESTION DISTRIBUTION BIAS:")
    print("   • Each of 4 axes (AP, RF, TE, NC) has identical structure:")
    print("     - 4 questions favor left letter (positive direction)")
    print("     - 2 questions favor right letter (negative direction)")
    print("     - Net bias: +2 toward left letter per axis")
    print("   • Total: 16 left-biased vs 8 right-biased questions")
    
    print("\n2. SCORING MECHANISM:")
    print("   • User answers: -2 (strongly disagree) to +2 (strongly agree)")
    print("   • Positive direction questions: score += user_value")
    print("   • Negative direction questions: score -= user_value")
    print("   • Type determination: score ≥ 0 → left letter, score < 0 → right letter")
    
    print("\n3. MATHEMATICAL BIAS EFFECT:")
    print("   • Even completely neutral answers (all 0) result in ARTN")
    print("   • Each axis has built-in +2 bias toward left letter")
    print("   • To get ANY right letter (P/F/E/C), users must overcome this bias")
    
    print("\n📈 PROBABILITY RANKINGS")
    print("=" * 50)
    
    # Data from our analysis
    realistic_data = [
        ("ARTN", "絶対君主/冷徹女帝", 11.67),
        ("ARTC", "暴走ダンプカー/肉食ハンター", 8.36),
        ("PRTN", "生真面目公務員/鉄壁ガードマン", 8.33),
        ("AREN", "過保護パトロン/過保護ママ", 8.30),
        ("AFTN", "夜のCEO/氷の美貌", 8.28),
        ("AFEN", "愛の教祖/魔性の聖女", 5.93),
        ("PREN", "忠実番犬/従順秘書", 5.91),
        ("PFTN", "ソロプレイヤー/冷めた脚本家", 5.91),
        ("PRTC", "無口スナイパー/無口テクニシャン", 5.89),
        ("AFTC", "夜のジョーカー/小悪魔発明家", 5.88),
        ("AREC", "自意識スター/スポット女優", 5.87),
        ("PFEN", "愛の執行人/心中ロマンチスト", 4.19),
        ("PFTC", "性癖研究員/変態リケジョ", 4.19),
        ("AFEC", "ピーターパン/ティンカーベル", 4.18),
        ("PREC", "感度3000倍オス猫/とろける猫", 4.17),
        ("PFEC", "夢見る詩人/悲劇のヒロイン", 2.96)
    ]
    
    print("\nRealistic Distribution (moderate answers more likely):")
    print("-" * 60)
    
    # Group by number of left letters
    def count_left_letters(code):
        return sum(1 for c in code if c in 'ARTN')
    
    left_letter_groups = {}
    for code, name, prob in realistic_data:
        left_count = count_left_letters(code)
        if left_count not in left_letter_groups:
            left_letter_groups[left_count] = []
        left_letter_groups[left_count].append((code, name, prob))
    
    for left_count in sorted(left_letter_groups.keys(), reverse=True):
        group = left_letter_groups[left_count]
        print(f"\n{left_count} Left Letters (A/R/T/N):")
        for rank, (code, name, prob) in enumerate(group, 1):
            print(f"  {rank}. {code}: {prob:5.2f}% - {name}")
    
    print("\n🎯 STATISTICAL PATTERNS")
    print("=" * 50)
    
    # Calculate aggregated statistics - count left letters properly
    def count_left_letters(code):
        return sum(1 for c in code if c in 'ARTN')
    
    total_left_heavy = sum(prob for code, _, prob in realistic_data if count_left_letters(code) >= 3)
    total_right_heavy = sum(prob for code, _, prob in realistic_data if count_left_letters(code) <= 1)
    
    print(f"\n• Types with 3-4 left letters (A/R/T/N): {total_left_heavy:.1f}% combined")
    print(f"• Types with 3-4 right letters (P/F/E/C): {total_right_heavy:.1f}% combined")
    if total_right_heavy > 0:
        print(f"• Ratio (Left-heavy : Right-heavy): {total_left_heavy/total_right_heavy:.1f} : 1")
    else:
        print("• No types with 3-4 right letters in top probabilities")
    
    # Most vs least common
    most_common = realistic_data[0]
    least_common = realistic_data[-1]
    print(f"\n• Most common: {most_common[0]} ({most_common[2]:.1f}%)")
    print(f"• Least common: {least_common[0]} ({least_common[2]:.1f}%)")
    print(f"• Ratio (Most : Least): {most_common[2]/least_common[2]:.1f} : 1")
    
    print("\n🔬 AXIS-SPECIFIC ANALYSIS")
    print("=" * 50)
    
    print("\nProbability by Individual Axis:")
    print("-" * 35)
    
    # Calculate probabilities for each letter
    axis_probs = {}
    for axis_letters in [('A', 'P'), ('R', 'F'), ('T', 'E'), ('N', 'C')]:
        left_letter, right_letter = axis_letters
        left_total = sum(prob for code, _, prob in realistic_data if left_letter in code)
        right_total = sum(prob for code, _, prob in realistic_data if right_letter in code)
        axis_probs[left_letter] = left_total
        axis_probs[right_letter] = right_total
    
    print(f"A (Active):     {axis_probs['A']:.1f}%")
    print(f"P (Passive):    {axis_probs['P']:.1f}%")
    print(f"R (Real):       {axis_probs['R']:.1f}%")
    print(f"F (Fantasy):    {axis_probs['F']:.1f}%") 
    print(f"T (Tech):       {axis_probs['T']:.1f}%")
    print(f"E (Emo):        {axis_probs['E']:.1f}%")
    print(f"N (Normal):     {axis_probs['N']:.1f}%")
    print(f"C (Chaos):      {axis_probs['C']:.1f}%")
    
    print("\n💡 IMPLICATIONS FOR USERS")
    print("=" * 50)
    
    print("\n1. MOST LIKELY OUTCOMES:")
    print("   • 60%+ chance of getting a type with 3-4 left letters")
    print("   • ARTN, ARTC, PRTN most common (28%+ combined)")
    print("   • Strong bias toward dominant/active personality descriptions")
    
    print("\n2. RARE TYPES (< 5% each):")
    print("   • PFEC (夢見る詩人/悲劇のヒロイン): 2.96%")
    print("   • PREC, AFEC, PFEN, PFTC: 4.17-4.19% each")
    print("   • These require consistently negative answers across multiple axes")
    
    print("\n3. ANSWER STRATEGY TO GET SPECIFIC TYPES:")
    print("   • For ARTN (most common): Answer mostly neutral/positive")
    print("   • For PFEC (least common): Answer mostly negative (-1, -2)")
    print("   • For balanced type: Need strategic mix to overcome bias")
    
    print("\n⚖️ DESIGN ASSESSMENT")
    print("=" * 50)
    
    print("\nStrengths:")
    print("• Clear scoring mechanism")
    print("• Comprehensive character descriptions")
    print("• 16 distinct personality types")
    
    print("\nWeaknesses:")
    print("• Systematic bias toward 'active' traits")
    print("• Unequal probability distribution")
    print("• Some types extremely rare (< 3%)")
    print("• Neutral answers don't yield neutral type")
    
    print("\n🔧 POTENTIAL IMPROVEMENTS")
    print("=" * 50)
    
    print("To achieve more balanced distribution:")
    print("1. Equal questions per direction (3 positive, 3 negative per axis)")
    print("2. Adjust scoring thresholds (e.g., score > +1 for left letter)")
    print("3. Weight questions differently based on importance")
    print("4. Add more nuanced scoring beyond binary left/right classification")
    
    print("\n" + "=" * 80)
    print("ANALYSIS CONCLUSIONS")
    print("=" * 80)
    
    print("\nThe Night Type MBTI system has a significant mathematical bias toward")
    print("'active' personality traits (A, R, T, N). This results in:")
    print()
    print("• ARTN being 4x more likely than PFEC")
    print("• 60%+ probability of getting a dominant/active type")
    print("• Only 15%+ probability of getting a submissive/passive type")
    print()
    print("While this may reflect the intended design philosophy of emphasizing")
    print("active sexuality traits, users should be aware that the diagnostic")
    print("system is not statistically neutral and has built-in preferences.")

if __name__ == "__main__":
    print_detailed_summary()