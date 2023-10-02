<?php

// This file defines the LuaValue class.

namespace Roblox\Grid\Rcc;

class LuaValue {
	public $value;
	public $type;
	public $table;
	
	// Constructor
	function __construct($baseValue) {
		if (isset($baseValue)) {
			$luaValue = LuaValue::serializeValue($baseValue);
			foreach ($luaValue as $name => $child) {
				$this->{$name} = $child;
			}
		}
	}
	
	// This function serializes the given PHP variable into a Lua value.
	static function serializeValue($phpValue) {
		$luaValue = new LuaValue(null); // A really dumb hack
		$luaValue->type = LuaType::castToLuaType($phpValue);
		if (is_array($phpValue)) {
			// TODO: Make this an empty array by default to allow for easy table creation?
			$luaValue->table = [];
			foreach ($phpValue as $value) {
				array_push($luaValue->table, new LuaValue($value));
			}
		}else {
			$luaValue->value = $phpValue;
		}
		return $luaValue;
	}
	
	// This function deserializes the given Lua value into a normal PHP variable.
	static function deserializeValue($luaValue) {
		if (is_array($luaValue)) {
			$phpValue = [];
			foreach ($luaValue as $value) {
				array_push($phpValue, LuaValue::deserializeValue($value));
			}
		}else {
			if ($luaValue->type == LuaType::LUA_TTABLE && isset($luaValue->table->LuaValue)) {
				$phpValue = [];
				if (is_array($luaValue->table->LuaValue)) {
					$value = $luaValue->table->LuaValue;
				}else {
					$value = $luaValue->table;
				}
				foreach ($value as $value) {
					array_push($phpValue, $value->deserialize());
				}
			}elseif ($luaValue->type == LuaType::LUA_TNIL) {
				// Null value
				$phpValue = null;
			}else {
				// Direct read from LuaValue's value
				$phpValue = $luaValue->value;
			}
		}
		return $phpValue;
	}
	
	// This function deserializes the current Lua value into a normal PHP variable.
	function deserialize() {
		return LuaValue::deserializeValue($this);
	}
}

// EOF