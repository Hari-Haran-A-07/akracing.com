# frozen_string_literal: true
# AJITH KUMAR RACING (AKR) — POLYGLOT MOTORSPORT PLATFORM
# Ruby Declarative Race Strategy Automation DSL & Incident Evaluator
# Language: Ruby

require 'json'

module Akr
  class StrategyRuleEngine
    attr_reader :rules, :executed_actions

    def initialize
      @rules = []
      @executed_actions = []
    end

    def on_incident(incident_type, &block)
      @rules << { type: incident_type, action: block }
    end

    def evaluate_track_scenario(scenario)
      matched_decisions = []

      @rules.each do |rule|
        if rule[:type] == scenario[:incident] || rule[:type] == :ALL
          decision = rule[:action].call(scenario)
          matched_decisions << decision if decision
        end
      end

      {
        scenario_analyzed: scenario,
        decisions: matched_decisions,
        recommendation: matched_decisions.last || 'STAY_OUT_MAINTAIN_PACE',
        strategy_mode: scenario[:gap_ahead] < 1.5 ? 'ATTACK_OVERCUT' : 'TIRE_PRESERVATION'
      }
    end
  end

  class RaceDirectorDSL
    def self.build_default_strategy
      engine = StrategyRuleEngine.new

      engine.on_incident(:SAFETY_CAR) do |s|
        if s[:tire_age_laps] > 12 && s[:pit_window_open]
          { action: 'BOX_NOW', new_compound: 'HARD', rationale: 'Free pitstop under Safety Car delta' }
        else
          { action: 'STAY_OUT', rationale: 'Track position priority, tire life still nominal' }
        end
      end

      engine.on_incident(:RAIN_INCOMING) do |s|
        if s[:track_wetness_pct] > 35
          { action: 'BOX_FOR_INTERMEDIATES', new_compound: 'INTERMEDIATE', rationale: 'Rain intensity exceeding slick crossover threshold' }
        else
          { action: 'EXTEND_STINT_2_LAPS', rationale: 'Monitor radar track dampness before committing to wets' }
        end
      end

      engine.on_incident(:YELLOW_FLAG_SECTOR_2) do |s|
        { action: 'LIFT_AND_COAST_S2', engine_map: 'MAP_CONSERVE_3', rationale: 'Maintain delta, harvest ERS hybrid energy' }
      end

      engine
    end
  end
end
