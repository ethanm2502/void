<?php

// This file defines the LuaType enum. Though this is a class, please treat it like an enum and **ONLY** reference it statically.

namespace Roblox\Grid\Rcc;

class LuaType {
	public const LUA_TNIL = "LUA_TNIL";
	public const LUA_TBOOLEAN = "LUA_TBOOLEAN";
	public const LUA_TNUMBER = "LUA_TNUMBER";
	public const LUA_TSTRING = "LUA_TSTRING";
	public const LUA_TTABLE = "LUA_TTABLE";
	
	// Casts a PHP value type to a LuaType enum.
	static function castToLuaType($value) {
		$luaTypeConversions = [
		'NULL' 		=> LuaType::LUA_TNIL,
		'boolean'	=> LuaType::LUA_TBOOLEAN,
		'integer'	=> LuaType::LUA_TNUMBER,
		'double'	=> LuaType::LUA_TNUMBER,
		'string'	=> LuaType::LUA_TSTRING,
		'array'		=> LuaType::LUA_TTABLE,
		'object'	=> LuaType::LUA_TNIL
		];
		return $luaTypeConversions[gettype($value)];
	}
}

// EOF